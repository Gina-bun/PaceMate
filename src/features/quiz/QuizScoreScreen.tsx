
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";

export function QuizScoreScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjectId, topicId } = useParams();

  const { score = 0, total = 0 } = (location.state as { score: number; total: number }) || {};
  const passed = total > 0 && score / total >= 0.5;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 gap-4 p-4 text-center">
      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">🏆</div>
      <h1 className="text-xl font-bold">Quiz Score</h1>
      <p className="text-gray-700">{passed ? "You did it!" : "Keep practicing, you'll get there!"}</p>
      <p className="font-semibold">Score: {score} out of {total}</p>

      <div className="flex flex-row gap-3 w-full sm:w-[50vw]">
        <Button
          type="button"
          onClick={() => navigate(`/subject/${subjectId}/topic/${topicId}/quiz`)}
          styles="bg-orange-400 text-amber-50 flex-1"
        >
          RETAKE QUIZ
        </Button>
        <Button
          type="button"
          onClick={() => navigate(`/subject/${subjectId}/topic/${topicId}`)}
          styles="bg-white border border-gray-300 text-gray-700 flex-1"
        >
          SEE SUMMARY
        </Button>
      </div>
    </div>
  );
}