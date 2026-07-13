
interface ProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-orange-400 h-2 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}