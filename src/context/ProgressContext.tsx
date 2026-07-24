import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  collectionGroup,
  where,
  query,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

const PASSING_RATIO = 0.7; // 70% required to mark a subtopic complete

function progressDocId(subjectId: string, topicId: string, subtopicId: string) {
  return `${subjectId}__${topicId}__${subtopicId}`.replace(/\s+/g, "-");
}

export interface AnsweredQuestion {
  questionId: string;
  selectedOptionId: string;
  correct: boolean;
}

interface ProgressRecord {
  subjectId: string;
  topicId: string;
  subtopicId: string;
  completed: boolean;
  quizResult?: { correct: number; total: number };
  completedAt?: Timestamp;
  visitedAt?: Timestamp;
}

interface InProgressQuiz {
  subjectId: string;
  topicId: string;
  subtopicId: string;
  currentIndex: number;
  answers: AnsweredQuestion[];
  updatedAt?: Timestamp;
}

interface LastVisited {
  subjectId: string;
  topicId: string;
  topicTitle: string;
  subtopicId: string;
  subtopicTitle: string;
}

interface MetaDoc {
  activeDates?: string[];
  lastVisited?: LastVisited;
}

interface RecentActivityItem {
  subjectId: string;
  subtopicId: string;
  subtopicTitle?: string; // filled in by caller if needed from curriculum data
  quizResult?: { correct: number; total: number };
  completedAt: Timestamp;
}

interface AttemptDoc {
  uid: string;
  subjectId: string;
    topicId: string;    
  subtopicId: string;
  answers: AnsweredQuestion[];
  correct: number;
  total: number;
  completedAt: Timestamp;
}

interface RecapQuestionRef {
  topicId: string;
  subtopicId: string;
  questionId: string;
  missCount: number;
}

interface RecapData {
  subject: string; // subjectId
  count: number; // weighted count of wrong answers for that subject
  questions: RecapQuestionRef[];
}

interface ProgressContextType {
  records: Record<string, ProgressRecord>;
  inProgressQuizzes: Record<string, InProgressQuiz>;
  loading: boolean;
  error: Error | null;
  activeDates: string[];
  lastVisited: LastVisited | null;
  currentStreak: number;
  recap: RecapData | null; 
  submitRecapAttempt: (subjectId: string, answers: AnsweredQuestion[]) => Promise<{ correct: number; total: number }>;

  isSubtopicComplete: (
    subjectId: string,
    topicId: string,
    subtopicId: string,
  ) => boolean;
  getInProgressQuiz: (
    subjectId: string,
    topicId: string,
    subtopicId: string,
  ) => InProgressQuiz | null;
  findAnyInProgressQuiz: () => InProgressQuiz | null;
  getRecentActivity: (max?: number) => RecentActivityItem[];

  recordVisit: (info: LastVisited) => Promise<void>;
  saveQuizProgress: (
    subjectId: string,
    topicId: string,
    subtopicId: string,
    currentIndex: number,
    answers: AnsweredQuestion[],
  ) => Promise<void>;
  submitQuizAttempt: (
    subjectId: string,
    topicId: string,
    subtopicId: string,
    answers: AnsweredQuestion[],
  ) => Promise<{ passed: boolean; correct: number; total: number }>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);
const todayStr = () => new Date().toISOString().slice(0, 10);

function computeStreak(activeDates: string[]): number {
  if (activeDates.length === 0) return 0;
  const set = new Set(activeDates);
  const cursor = new Date();
  if (!set.has(todayStr())) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [records, setRecords] = useState<Record<string, ProgressRecord>>({});
  const [inProgressQuizzes, setInProgressQuizzes] = useState<
    Record<string, InProgressQuiz>
  >({});
  const [meta, setMeta] = useState<MetaDoc>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [allAttempts, setAllAttempts] = useState<AttemptDoc[]>([]);

  useEffect(() => {
    if (!user) {
      setRecords({});
      setInProgressQuizzes({});
      setMeta({});
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const progressCol = collection(db, "users", user.uid, "progress");
    const unsubProgress = onSnapshot(
      progressCol,
      (snap) => {
        const next: Record<string, ProgressRecord> = {};
        snap.forEach((d) => {
          if (d.id === "_meta") return;
          next[d.id] = d.data() as ProgressRecord;
        });
        setRecords(next);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      },
    );

    const inProgressCol = collection(db, "users", user.uid, "inProgress");
    const unsubInProgress = onSnapshot(inProgressCol, (snap) => {
      const next: Record<string, InProgressQuiz> = {};
      snap.forEach((d) => {
        next[d.id] = d.data() as InProgressQuiz;
      });
      setInProgressQuizzes(next);
    });

    const metaRef = doc(db, "users", user.uid, "progress", "_meta");
    const unsubMeta = onSnapshot(metaRef, (snap) => {
      setMeta((snap.data() as MetaDoc) ?? {});
    });

    const attemptsQuery = query(
      collectionGroup(db, "attempts"),
      where("uid", "==", user.uid),
    );
    const unsubAttempts = onSnapshot(attemptsQuery, (snap) => {
      setAllAttempts(snap.docs.map((d) => d.data() as AttemptDoc));
    });

    return () => {
      unsubProgress();
      unsubInProgress();
      unsubMeta();
      unsubAttempts(); 
    };
  }, [user]);

  // Strict Streak: only called when a quiz is actually passed (see submitQuizAttempt).
  // Visiting a page or autosaving progress does NOT count as "showed up today."
  async function touchToday() {
    if (!user) return;
    const today = todayStr();
    if (meta.activeDates?.includes(today)) return;
    const metaRef = doc(db, "users", user.uid, "progress", "_meta");
    await setDoc(metaRef, { activeDates: arrayUnion(today) }, { merge: true });
  }

  // Visiting a subtopic still updates "last visited" (for Continue Learning),
  // but no longer touches the streak.
  async function recordVisit(info: LastVisited) {
    if (!user) return;
    const metaRef = doc(db, "users", user.uid, "progress", "_meta");
    await setDoc(metaRef, { lastVisited: info }, { merge: true });

    const id = progressDocId(info.subjectId, info.topicId, info.subtopicId);
    const ref = doc(db, "users", user.uid, "progress", id);
    await setDoc(
      ref,
      { ...info, visitedAt: serverTimestamp() },
      { merge: true },
    );
  }

  // Autosave while answering — does NOT touch the streak either.
  async function saveQuizProgress(
    subjectId: string,
    topicId: string,
    subtopicId: string,
    currentIndex: number,
    answers: AnsweredQuestion[],
  ) {
    if (!user) return;
    const id = progressDocId(subjectId, topicId, subtopicId);
    const ref = doc(db, "users", user.uid, "inProgress", id);
    await setDoc(
      ref,
      {
        subjectId,
        topicId,
        subtopicId,
        currentIndex,
        answers,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }

  // The ONLY place that can touch the streak. Subtopic is marked complete
  // ONLY if the student scored >= 70%. A failed attempt is still logged
  // to history (for recap), but completed stays false and the streak
  // is not touched.
  async function submitQuizAttempt(
    subjectId: string,
    topicId: string,
    subtopicId: string,
    answers: AnsweredQuestion[],
  ) {
    if (!user) return { passed: false, correct: 0, total: 0 };

    const correct = answers.filter((a) => a.correct).length;
    const total = answers.length;
    const passed = total > 0 && correct / total >= PASSING_RATIO;
    const id = progressDocId(subjectId, topicId, subtopicId);

    const parentRef = doc(db, "users", user.uid, "progress", id);
    await setDoc(
      parentRef,
      {
        subjectId,
        topicId,
        subtopicId,
        completed: passed,
        quizResult: { correct, total },
        ...(passed ? { completedAt: serverTimestamp() } : {}),
      },
      { merge: true },
    );

    const attemptRef = doc(
      collection(db, "users", user.uid, "progress", id, "attempts"),
    );
    await setDoc(attemptRef, {
      uid: user.uid,
      subjectId,
      topicId,   
      subtopicId,
      answers,
      correct,
      total,
      completedAt: serverTimestamp(),
    });

    if (passed) {
      await touchToday(); // streak only advances on a passing attempt
    }

    const inProgressRef = doc(db, "users", user.uid, "inProgress", id);
    await deleteDoc(inProgressRef).catch(() => {});

    return { passed, correct, total };
  }

  function isSubtopicComplete(
    subjectId: string,
    topicId: string,
    subtopicId: string,
  ) {
    const id = progressDocId(subjectId, topicId, subtopicId);
    return Boolean(records[id]?.completed);
  }

  function getInProgressQuiz(
    subjectId: string,
    topicId: string,
    subtopicId: string,
  ) {
    const id = progressDocId(subjectId, topicId, subtopicId);
    return inProgressQuizzes[id] ?? null;
  }

  function findAnyInProgressQuiz() {
    const values = Object.values(inProgressQuizzes);
    return values.length > 0 ? values[0] : null;
  }

  // Latest completed subtopics, newest first, capped at `max` (default 4).
  function getRecentActivity(max = 4): RecentActivityItem[] {
    return Object.values(records)
      .filter((r) => r.completed && r.completedAt)
      .sort((a, b) => b.completedAt!.toMillis() - a.completedAt!.toMillis())
      .slice(0, max)
      .map((r) => ({
        subjectId: r.subjectId,
        subtopicId: r.subtopicId,
        quizResult: r.quizResult,
        completedAt: r.completedAt!,
      }));
  }

  const recap: RecapData | null = (() => {
  const subjectMissCounts: Record<string, number> = {};
  const questionMissCounts: Record<string, RecapQuestionRef> = {};

  allAttempts.forEach((attempt) => {
    attempt.answers
      .filter((a) => !a.correct)
      .forEach((a) => {
        subjectMissCounts[attempt.subjectId] = (subjectMissCounts[attempt.subjectId] ?? 0) + 1;

        const key = `${attempt.subjectId}__${attempt.topicId}__${attempt.subtopicId}__${a.questionId}`;
        if (!questionMissCounts[key]) {
          questionMissCounts[key] = {
            topicId: attempt.topicId,
            subtopicId: attempt.subtopicId,
            questionId: a.questionId,
            missCount: 0,
          };
        }
        questionMissCounts[key].missCount += 1;
      });
  });

  const entries = Object.entries(subjectMissCounts);
  if (entries.length === 0) return null;

  const [topSubject, topCount] = entries.reduce((best, curr) => (curr[1] > best[1] ? curr : best));

  const questions = Object.entries(questionMissCounts)
    .filter(([key]) => key.startsWith(`${topSubject}__`))
    .map(([, ref]) => ref)
    .sort((a, b) => b.missCount - a.missCount)
    .slice(0, 10); // cap recap quiz length

  return { subject: topSubject, count: topCount, questions };
})();

async function submitRecapAttempt(subjectId: string, answers: AnsweredQuestion[]) {
  if (!user) return { correct: 0, total: 0 };
  const correct = answers.filter((a) => a.correct).length;
  const total = answers.length;

  const ref = doc(collection(db, "users", user.uid, "recapAttempts"));
  await setDoc(ref, { uid: user.uid, subjectId, answers, correct, total, completedAt: serverTimestamp() });

  const passed = total > 0 && correct / total >= PASSING_RATIO;
  if (passed) await touchToday(); // genuine practice still counts toward the streak

  return { correct, total };
}

  return (
    <ProgressContext.Provider
      value={{
        records,
        inProgressQuizzes,
        loading,
        error,
        activeDates: meta.activeDates ?? [],
        lastVisited: meta.lastVisited ?? null,
        currentStreak: computeStreak(meta.activeDates ?? []),
        recap,
        submitRecapAttempt,
        isSubtopicComplete,
        getInProgressQuiz,
        findAnyInProgressQuiz,
        getRecentActivity,
        recordVisit,
        saveQuizProgress,
        submitQuizAttempt,
        
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
