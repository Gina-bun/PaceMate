import { Flame } from "lucide-react";

interface StreakBadgeProps {
    streak: number;
}

export function StreakBadge({streak}: StreakBadgeProps){
    if (streak < 1) return null;

    return (
      <div className="flex  flex-col items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-md">
        <Flame/>
        <span>{streak}-day streak</span>
      </div>
    )
}