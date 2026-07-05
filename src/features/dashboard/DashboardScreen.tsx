
import { Card } from "../../components/Card";
import { StackedCard } from "./StackedCard";

const welcomeCards = [
  { title: "Welcome to PaceMate", description: "Learn at your own pace, every day." },
  { title: "Track Your Progress", description: "Complete topics and quizzes to level up." },
  { title: "Stay Consistent", description: "Little by little, a little becomes a lot." },
];

const subjects = ["Mathematics", "Science", "English", "Social Studies"];

const isFirstTime = true; 

export function DashboardScreen() {
  return (
    <div className="flex flex-col gap-6 p-4 bg-amber-50 min-h-screen">
      <div>
        <h1 className="text-xl font-bold">PaceMate</h1>
        <p className="text-gray-600">Welcome back, Amina!</p>
      </div>

      <StackedCard cards={welcomeCards} />

      <div>
        <h2 className="font-semibold mb-2">Available Subjects</h2>
        <div className="grid grid-cols-2 gap-3">
          {subjects.map((subject) => (
            <Card key={subject} variant="subject">
              <p className="font-medium">{subject}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">
          {isFirstTime ? "Warm-Up Quiz" : "Quiz Recap"}
        </h2>
        <Card variant={isFirstTime ? "warmup" : "review"}>
          <p className="text-sm">
            {isFirstTime
              ? "Take a quick warm-up quiz to get started!"
              : "Retake: Cell Structure Quiz"}
          </p>
        </Card>
      </div>
    </div>
  );
}