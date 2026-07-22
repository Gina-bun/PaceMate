import { Card } from "./Card";

interface RecentActivityCardProps {
  subject: string;
  subtopic: string;
  score?: { correct: number; total: number };
}

export function RecentActivityCard({ subject, subtopic, score }: RecentActivityCardProps) {
  return (
    <div className="flex-shrink-0 w-40 snap-start">
      <Card variant="subject">
        <p className="text-xs text-gray-500">{subject}</p>
        <p className="text-sm font-medium">{subtopic}</p>
        {score && <p className="text-xs text-gray-500 mt-1">{score.correct}/{score.total}</p>}
      </Card>
    </div>
  );
}