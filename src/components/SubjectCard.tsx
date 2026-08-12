import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";
import type { Subject } from "../features/types"; 
import type { SubjectDisplayStatus } from "../utils/subjectStatus";

interface SubjectCardProps {
  subject: Subject;
  status: SubjectDisplayStatus;
  completedCount?: number;
  totalCount?: number;
  onClick?: () => void;
}

export function SubjectCard({
  subject,
  status,
  completedCount = 0,
  totalCount = 0,
  onClick,
}: SubjectCardProps) {
  const isLocked = status === "coming-soon";

  return (
      <div className="shrink-0 w-40 md:w-52 lg:w-66 snap-start">
    <Card
      variant="subject"
      padded={false}
      onClick={isLocked ? undefined : onClick}
      className={isLocked ? "opacity-60 bg-linear-to-b from-gray-50 to-gray-200/50" : "bg-linear-to-b from-gray-50 to-gray-200/30"}
    >
      <div className="h-24 md:h-30 lg:h-33 w-full bg-cover bg-center rounded-t-md" style={{ backgroundImage: `url(${subject.image})` }} />

      <div className="p-3">
        <p className="font-medium text-sm sm:text-base ">{subject.name}</p>

        {status === "in-progress" && totalCount > 0 && (
          <div className="mt-2">
            <ProgressBar value={completedCount} max={totalCount} />
            <span className="text-[11px] text-gray-500">
              {completedCount}/{totalCount} complete
            </span>
          </div>
        )}
      </div>
    </Card>
    </div>
  );
}