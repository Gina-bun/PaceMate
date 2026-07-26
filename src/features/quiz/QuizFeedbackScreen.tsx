import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/Button";
import { useCurriculum } from "../../context/CurriculumContext";
import { routes } from "../../routes";
import type { AnsweredQuestion } from "../../context/ProgressContext";

export function QuizFeedbackScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjectId, topicId, subtopicId } = useParams();
  const { subjects, loading, error } = useCurriculum();

  const { score = 0, total = 0, answers = [] } =
    (location.state as { score: number; total: number; passed: boolean; answers: AnsweredQuestion[] }) || {};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const subject = subjects.find((s) => s.subject.toLowerCase() === subjectId);
  const topic = subject?.topics.find((t) => t.id === topicId);
  const subtopic = topic?.subtopics.find((s) => s.id === subtopicId);
  const questions = subtopic?.quiz || [];

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 p-4 gap-4">
      <button onClick={() => navigate(routes.subject(subjectId!))} className="text-sm self-start">
        <ArrowLeft size={18} />
      </button>

      <div>
        <h1 className="text-xl font-bold">Quiz Summary</h1>
        <p className="text-sm text-gray-600">
          {subtopic?.title} — {score} out of {total} correct
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {questions.map((q, i) => {
          const answered = answers.find((a) => a.questionId === q.id);
          const isCorrect = answered?.correct ?? false;
          const selectedOption = q.options.find((o) => o.id === answered?.selectedOptionId);
          const correctOption = q.options.find((o) => o.id === q.correctOptionId);

          return (
            <div
              key={q.id}
              className={`bg-white rounded-lg p-4 border-l-4 ${
                isCorrect ? "border-green-600" : "border-red-600"
              }`}
            >
              <p className="text-xs text-gray-500 mb-1">Question {i + 1}</p>
              <p className="font-semibold text-gray-900 mb-2">{q.question}</p>

              <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                Your answer: {selectedOption?.text ?? "—"}
                {isCorrect ? " ✓" : " ✗"}
              </p>

              {!isCorrect && (
                <p className="text-sm text-green-700 mt-1">
                  Correct answer: {correctOption?.text}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button
          type="button"
          onClick={() => navigate(routes.quiz(subjectId!, topicId!, subtopicId!))}
          styles="bg-orange-400 text-amber-50 flex-1"
        >
          RETAKE QUIZ
        </Button>
        <Button
          type="button"
          onClick={() => navigate(routes.subject(subjectId!))}
          styles="bg-white border border-gray-300 text-gray-700 flex-1"
        >
          BACK TO SUBJECT
        </Button>
      </div>
    </div>
  );
}