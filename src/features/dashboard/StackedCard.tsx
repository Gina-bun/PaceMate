
import { useState } from "react";
import { Card } from "../../components/Card";

interface StackedCardProps {
  cards: { title: string; description: string }[];
}

export function StackedCard({ cards }: StackedCardProps) {
  const [index, setIndex] = useState(0);
  const isLast = index === cards.length - 1;

  const handleSwipe = () => {
    if (!isLast) setIndex((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-40">
      {cards.slice(index).map((card, i) => (
        <div
          key={index + i}
          className="absolute inset-0 transition-transform"
          style={{
            transform: `translateY(${i * 6}px) scale(${1 - i * 0.03})`,
            zIndex: cards.length - i,
          }}
        >
          <Card
            variant="welcome"
            onClick={i === 0 ? handleSwipe : undefined}
          >
            <h3 className="font-semibold">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.description}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}