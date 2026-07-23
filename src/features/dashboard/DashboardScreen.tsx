import { useNavigate } from "react-router-dom";
import { Carousel } from "../../components/Carousel";
import { PrimaryActionCard } from "../../components/PrimaryActionCard";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { ProgressOverviewCard } from "../../components/ProgressOverviewCard";
import { RecentActivityCard } from "../../components/RecentActivityCard";
import { StreakBadge } from "../../components/StreakBadge";
import { TipOfTheDay } from "../../components/TipOfTheDay";
import { WarmUpOrRecapCard } from "../../components/WarmUpRecapCard";
import { WeeklyActivityStrip } from "../../components/WeeklyActivityStrip";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import type { FlatSubtopic, SubjectData } from "../types";
import { useMemo } from "react";
import { routes } from "../../routes";
import { useCurriculum } from "../../context/CurriculumContext";


function flattenSubtopics(subjects: SubjectData[]): FlatSubtopic[] {
  return subjects.flatMap((s) =>
    s.topics.flatMap((topic) =>
      topic.subtopics.map((subtopic) => ({
        subjectId: s.subject.toLowerCase(),
        subject: s.subject,
        topic,
        subtopic,
      })),
    ),
  );
}

export function DashboardScreen() {
  const { user } = useAuth();

  const { subjects, loading: curriculumLoading } = useCurriculum();
  const {
    records,
    loading: progressLoading,
    isSubtopicComplete,
    findAnyInProgressQuiz,
    lastVisited,
    activeDates,
    currentStreak,
    getRecentActivity,
  } = useProgress();
  const navigate = useNavigate();

  const flat = useMemo(() => flattenSubtopics(subjects), [subjects]);

  // Overall + each subject's progress, NB: deps eslinet lines can be ignored/disabled
  const subjectProgress = useMemo(
    () =>
      subjects.map((s) => {
        const subjectId = s.subject.toLowerCase();
        const ids = s.topics.flatMap((t) => t.subtopics.map((sub) => sub.id));
        const subTopics = s.topics.flatMap((t) =>
          t.subtopics.map((sub) => ({ topicId: t.id, subtopicId: sub.id })),
        );
        const completed = subTopics.filter((st) =>
          isSubtopicComplete(subjectId, st.topicId, st.subtopicId),
        ).length;
        return {
          subject: s.subject,
          percent: ids.length ? Math.round((completed / ids.length) * 100) : 0,
        };
      }),
    [subjects, records],
  );

  const overall = useMemo(() => {
    const completed = flat.filter((f) =>
      isSubtopicComplete(f.subjectId, f.topic.id, f.subtopic.id),
    ).length;
    return { completed, total: flat.length };
  }, [flat, records]);

  // for primary action card: resume/continue/start
  const inProgressQuiz = findAnyInProgressQuiz();

  const primaryAction = useMemo(() => {
    if (inProgressQuiz) {
      const match = flat.find(
        (f) =>
          f.subjectId === inProgressQuiz.subjectId &&
          f.topic.id === inProgressQuiz.topicId &&
          f.subtopic.id === inProgressQuiz.subtopicId,
      );
      if (match) {
        return {
          kind: "resume-quiz" as const,
          subject: match.subject,
          subtopic: match.subtopic.title,
          questionIndex: inProgressQuiz.currentIndex + 1,
          totalQuestions: match.subtopic.quiz.length,
          onAction: () =>
            navigate(
              routes.quiz(match.subjectId, match.topic.id, match.subtopic.id),
            ),
        };
      }
    }

    const first = flat[0];
    if (first) {
      return {
        kind: "start" as const,
        subject: first.subject,
        topic: first.subtopic.title,
        onAction: () =>
          navigate(
            routes.subtopic(first.subjectId, first.topic.id, first.subtopic.id),
          ),
      };
    }

    return null;
  }, [inProgressQuiz, lastVisited, flat, records]);

  // Recent activity has max 4, most recent ones
  const recentActivity = useMemo(() => {
    return getRecentActivity(4).map((r) => {
      const match = flat.find(
        (f) => f.subjectId === r.subjectId && f.subtopic.id === r.subtopicId,
      );
      return {
        subject: match?.subject ?? r.subjectId,
        subtopic: match?.subtopic.title ?? r.subtopicId,
        score: r.quizResult,
      };
    });
  }, [getRecentActivity, flat, records]);

  const subjectOptions = subjects.map((s) => ({
    label: s.subject,
    value: s.subject.toLowerCase(),
  }));

  if (curriculumLoading || progressLoading) {
    return <div className="p-6 text-gray-500">Loading your dashboard...</div>;
  }

    const firstName = user?.name.split(" ")[0] || "User";

  return (
    <div className="flex flex-col gap-6 p-4 bg-amber-50 min-h-screen">
      {/* HEADER (greeting, profile avatar, streak badge(for returning user)) */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome back {firstName}</h1>
        <div className="flex items-center gap-3">
          <StreakBadge streak={currentStreak} />
          <ProfileAvatar name={user?.name ?? ""} height={16} width={16} />
        </div>
      </div>

      {/* Weekly Activity Strip */}
      <WeeklyActivityStrip activeDates={activeDates} />

      {/* Overall progress snapshot */}
      <ProgressOverviewCard
        completed={overall.completed}
        total={overall.total}
        subjectProgress={subjectProgress}
      />

      {/* warm up quiz /recap quiz card*/}
      <WarmUpOrRecapCard
        hasRecapData={false}
        subjectOptions={subjectOptions}
        onStartWarmUp={(subject) => {
          const first = flat.find((item) => item.subjectId === subject);
          if (first)
            navigate(
              routes.quiz(first.subjectId, first.topic.id, first.subtopic.id),
            );
        }}
        onStartRecap={() => {}}
      />

      {/* Primary action card(unfinished quiz, a visited-but-not-quizzed subtopic, or nothing if none) */}
      <PrimaryActionCard
        kind={primaryAction.kind}
        subject={primaryAction.subject}
        {...(primaryAction.kind === "start"
          ? { topic: primaryAction.topic }
          : {})}
        {...(primaryAction.kind === "resume-quiz"
          ? {
              questionIndex: primaryAction.questionIndex,
              totalQuestions: primaryAction.totalQuestions,
            }
          : {})}
        {...(primaryAction.kind === "continue" ||
        primaryAction.kind === "resume-quiz"
          ? { subtopic: primaryAction.subtopic }
          : {})}
        onAction={primaryAction.onAction}
      />

      {/* Tip of the day */}
      <TipOfTheDay />

      {/* recent activity (recent subtopics, quizzes) */}
      {recentActivity.length > 0 && (
        <div className="min-w-0">
          <h2 className="font-semibold mb-2">Recent activity</h2>
          <Carousel>
            {recentActivity.map((item, i) => (
              <RecentActivityCard
                key={`${item.subject}-${item.subtopic}-${i}`}
                {...item}
              />
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
