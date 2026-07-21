import { Card } from "../../components/Card";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { ProgressOverviewCard } from "../../components/ProgressOverviewCard";
import { StreakBadge } from "../../components/StreakBadge";
import { WeeklyActivityStrip } from "../../components/WeeklyActivityStrip";
import { useAuth } from "../../context/AuthContext";

//replace hard coded data with useProgress() / useCurriculum() later

const mockStreak = 2;
const mockActiveDates = ["2026-07-19", "2026-07-20", "2026-07-21"];
const mockCompleted = 12;
const mockTotal = 40;

const mockSubjectProgress = [
  { subject: "Social Studies", percent: 30 },
  { subject: "Mathematics", percent: 0 },
  { subject: "English", percent: 0 },
  { subject: "Science", percent: 0 },
];

const mockSubjectOptions = mockSubjectProgress.map((s) => ({label: s.subject, value: s.subject}));
const mockHasRecap = mockCompleted > 0;
const mockRecentActivity = [
  { subject: "Social Studies", subtopic: "The People of Ghana", score: { correct: 8, total: 10 } },
  { subject: "Social Studies", subtopic: "Environmental Issues" },
];


export function DashboardScreen() {
  const { user } = useAuth();
  if(!user) return <p>Loading...</p>
  console.log(user);
  const firstName = user.name.split(" ")[0] || "User";
  console.log(firstName);

  return (
    <div className="flex flex-col gap-6 p-4 bg-amber-50 min-h-screen">
      {/* HEADER (greeting, profile avatar, streak badge(for returning user)) */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome back {firstName}</h1>
        <div className="flex items-center gap-3">
            <StreakBadge streak={mockStreak} />
            <ProfileAvatar name={user.name} height={16} width={16} />
        </div>
        
      </div>

      {/* Weekly Activity Strip */}
      <WeeklyActivityStrip activeDates={mockActiveDates}/>

      {/* Overall progress snapshot */}
      <ProgressOverviewCard completed={mockCompleted} total={mockTotal} subjectProgress={mockSubjectProgress} />
      {/* Primary action card(unfinished quiz, a visited-but-not-quizzed subtopic, or nothing if none) */}

      {/* warm up quiz /recap quiz card*/}
      {/* <div>
        <h2 className="font-semibold mb-2">
          {isFirstTime ? "Warm-Up Quiz" : "Quiz Recap"}
        </h2>
        <Card variant={isFirstTime ? "warmup" : "review"}>
          <p className="text-sm">
            {isFirstTime
              ? "Take a quick warm-up quiz to get started!"
              : "Retake: Cell Structure Quiz"}
          </p>
        </Card>
      </div> */}

      {/* recent activity (recent subtopics, quizzes) */}
      {/* subjects overview, compact row */}
    </div>
  );
}
