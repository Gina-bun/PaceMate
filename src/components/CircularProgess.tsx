import { getPercentage } from "../utils/getPercentage";

interface CircularProgessProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({
  value,
  max,
  size = 64,
  strokeWidth = 6,
}: CircularProgessProps) {
  const percent = getPercentage({ value, max });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#fb923c"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xs font-semibold" fill="#374151">
        {percent}%
      </text>
    </svg>
    
  );
}
