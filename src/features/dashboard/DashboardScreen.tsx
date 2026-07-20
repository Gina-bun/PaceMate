
import { Card } from "../../components/Card";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { useAuth } from "../../context/AuthContext";

// const welcomeCards = [
//   { title: "Welcome to PaceMate", description: "Learn at your own pace, every day." },
//   { title: "Track Your Progress", description: "Complete topics and quizzes to level up." },
//   { title: "Stay Consistent", description: "Little by little, a little becomes a lot." },
// ];

const isFirstTime = true; 

export function DashboardScreen() {
    const {user} = useAuth();
    const name: string = user.name;
    const firstName = name.split(" ")[0];
   

  return (
    <div className="flex flex-col gap-6 p-4 bg-amber-50 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Welcome back {firstName}</h1>
        <ProfileAvatar name={name} height={18} width={16}/>
      </div>

    {/* Continue learning */}
    

    {/* warm up quiz */}
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