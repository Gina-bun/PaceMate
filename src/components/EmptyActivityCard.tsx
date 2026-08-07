import { Card } from "./Card";

export function EmptyActivityCard() {
  return (
    <div className="shrink-0 w-50 snap-start">
      <Card variant="empty" className="flex items-center justify-center h-full min-h-[64px]">
        <span className="text-xs text-gray-400">No activity yet</span>
      </Card>
    </div>
  );
}