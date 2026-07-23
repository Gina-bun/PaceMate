import { Card } from "./Card";
import { CircularProgress } from "./CircularProgess";

interface SubjectProgress {
  subject: string;
  percent: number;
}

interface ProgressOverviewCardProps {
  completed: number;
  total: number;
  subjectProgress: SubjectProgress[];
}

export function ProgressOverviewCard({
  completed,
  total,
  subjectProgress,
}: ProgressOverviewCardProps) {
  if (completed === 0) {
    return (
      <Card variant="subject">
        <h2 className="font-semibold mb-3">Your subjects</h2>
        <div className="flex flex-col gap-2">
          {subjectProgress.map((s) => (
            <div 
            key={s.subject}
            className="flex justify-between text-sm">
              <span>{s.subject}</span>
              <span className="text-gray-500">{s.percent}%</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="subject">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Topics completed</p>
          <p className="text-2xl font-bold mt-1">
            {completed} of {total}
          </p>
        </div>
         <CircularProgress value={completed} max={total} />
      </div>
    </Card>
  );
}
