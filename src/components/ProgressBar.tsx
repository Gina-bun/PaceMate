import { getPercentage } from "../utils/getPercentage";
import type { ProgressBarProps } from "./types";

export function ProgressBar({ value, max }: ProgressBarProps) {
 const percent = getPercentage({value, max})

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-orange-400 h-2 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}