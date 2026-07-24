import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizQuestion } from "../../components/QuizQuestion";
import { Button } from "../../components/Button";
import { ProgressBar } from "../../components/ProgressBar";
import { Card } from "../../components/Card";
import { useCurriculum } from "../../context/CurriculumContext";
import { useProgress, type AnsweredQuestion } from "../../context/ProgressContext";
import { ArrowLeft } from "lucide-react";
import { routes } from "../../routes";

export function RecapQuizScreen() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { subjects, loading } = useCurriculum();
  const { recap, submitRecapAttempt } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnsweredQuestion[]>([]);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);

  // Build the actual question objects from recap's question refs by
  // looking each one up in the curriculum data.
  const recapQuestions = useMemo(() => {
    if (!recap || recap.subject !== subjectId) return [];
    const subject = subjects.find((s) => s.subject.toLowerCase() === subjectId);
    if (!subject) return [];

    return recap.questions
      .map((ref) => {
        const topic = subject.topics.find((t) => t.id === ref.topicId);
        const subtopic = topic?.subtopics.find((s) => s.id === ref.subtopicId);
        const question = subtopic?.quiz.find((q) => q.id === ref.questionId);
        return question ? { question, subtopicTitle: subtopic!.title } : null;
      })
      .filter((q): q is { question: NonNullable<typeof q>["question"]; subtopicTitle: string } => q !== null);
  }, [recap, subjectId, subjects]);

  if (loading) return <div>Loading...</div>;

  if (!recap || recap.subject !== subjectId || recapQuestions.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-amber-50 p-4 gap-4">
        <button onClick={() => navigate(-1)} className="text-sm self-start">
          <ArrowLeft size={18} />
        </button>
        <p>No recap questions available right now.</p>
      </div>
    );
  }

  const current = recapQuestions[currentIndex];
  const isLastQuestion = currentIndex === recapQuestions.length - 1;

  const handleNext = async () => {
    const correct = selectedOptionId === current.question.correctOptionId;
    const answeredQuestion: AnsweredQuestion = {
      questionId: current.question.id,
      selectedOptionId: selectedOptionId!,
      correct,
    };
    const updatedAnswers = [...answers, answeredQuestion];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      const finalResult = await submitRecapAttempt(subjectId!, updatedAnswers);
      setResult(finalResult);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    }
  };

  if (result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 gap-4 p-4 text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">🎯</div>
        <h1 className="text-xl font-bold">Recap complete</h1>
        <p className="font-semibold">{result.correct} of {result.total} correct</p>
        <Button type="button" onClick={() => navigate(routes.dashboard())} styles="bg-orange-400 text-amber-50">
          Back to dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 p-4 gap-4">
      <button onClick={() => navigate(-1)} className="text-sm self-start">
        <ArrowLeft size={18} />
      </button>

      <div>
        <h1 className="text-xl font-bold">Recap quiz</h1>
        <p className="text-sm text-gray-600">{current.subtopicTitle}</p>
      </div>

      <ProgressBar value={currentIndex + 1} max={recapQuestions.length} />

      <QuizQuestion
        questionNumber={currentIndex + 1}
        question={current.question.question}
        options={current.question.options}
        selectedOptionId={selectedOptionId}
        onSelect={setSelectedOptionId}
      />

      <Button type="button" onClick={handleNext} disabled={selectedOptionId === null} styles="bg-orange-400 text-amber-50">
        {isLastQuestion ? "SUBMIT" : "NEXT"}
      </Button>
    </div>
  );
}