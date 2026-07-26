import { useEffect, useState } from "react";
import stackedBooks from "../../assets/stackedBooks.png"
import { Card } from "../../components/Card"; 

interface GreetingCardProps {
  name: string;
  className?: string;
}

function getGreetingInfo(hour: number) {
  if (hour >= 5 && hour < 12) {
    return {
      greeting: "Good morning",
      message: "Your mind's fresh — a good time to learn something new.",
    };
  }
  if (hour >= 12 && hour < 17) {
    return {
      greeting: "Good afternoon",
      message: "A quick revision session could really pay off right now.",
    };
  }
  if (hour >= 17 && hour < 21) {
    return {
      greeting: "Good evening",
      message: "Nice moment to go back over what you covered today.",
    };
  }
  return {
    greeting: "Good night",
    message: "A short review before bed can help it stick.",
  };
}

export function GreetingCard({ name, className }: GreetingCardProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const { greeting, message } = getGreetingInfo(now.getHours());
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Card variant="greeting" className={`overflow-visible ${className ?? ""}`}>
      {/* decorative stars poking slightly out of the top */}
      <div className="pointer-events-none absolute -top-8 right-6 z-10 flex items-end gap-1">
        <img src={stackedBooks} alt="stacked books" className="w-78" />
      </div>

      <div className="flex h-full flex-col gap-5 pr-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {greeting}, {name}
          </h2>
          <p className="mt-2 text-md font-semibold text-white/90">{message}</p>
        </div>
        <p className="mt-4 font-bold text-5xl text-white/70">{timeString}</p>
      </div>
    </Card>
  );
}