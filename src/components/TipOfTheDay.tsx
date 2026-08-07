import { Card } from "./Card";

const TIPS = [
  "The Ashanti Kingdom's power came partly from controlling gold trade routes across West Africa.",
  "Knowing yourself helps you accept your strengths and identify where you can grow.",
  "Forests are renewable resources because they can be replanted and regrow over time.",
];

function getTipForToday(): string {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return TIPS[dayOfYear % TIPS.length];
}

export function TipOfTheDay({className}: {className?: string;}) {
  return (
    <Card variant="tip" className={className}>
      <p className="text-xs font-semibold text-orange-500 mb-1 md:text-lg lg:text-2xl">💡 Did you know?</p>
      <p className="text-sm text-gray-700 md:text-lg lg:text-xl">{getTipForToday()}</p>
    </Card>
  );
}