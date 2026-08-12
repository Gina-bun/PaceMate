import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizQuestion } from "../../components/QuizQuestion";
import { Button } from "../../components/Button";
import { ProgressBar } from "../../components/ProgressBar";
import { useCurriculum } from "../../context/CurriculumContext";
import { ArrowLeft } from "lucide-react";
import { routes } from "../../routes";
import {
  useProgress,
  type AnsweredQuestion,
} from "../../context/ProgressContext";

export function QuizScreen() {
  const navigate = useNavigate();
  const { subjects, loading, error } = useCurriculum();
  const { getInProgressQuiz, saveQuizProgress, submitQuizAttempt } =
    useProgress();
  const { subjectId, topicId, subtopicId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnsweredQuestion[]>([]);
  const [hasResumed, setHasResumed] = useState(false);

  const subject = subjects.find((s) => s.subject.toLowerCase() === subjectId);
  const topic = subject?.topics.find((t) => t.id === topicId);
  const subtopic = topic?.subtopics.find((s) => s.id === subtopicId);
  const questions = subtopic?.quiz || [];

  //on mount, check for saved in-progress state and resume from it, once.
  useEffect(() => {
    if (hasResumed || !subjectId || !topicId || !subtopicId) return;
    const saved = getInProgressQuiz(subjectId, topicId, subtopicId);

    if (saved) {
      setCurrentIndex(saved.currentIndex);
      setAnswers(saved.answers);
    }
    setHasResumed(true);
  }, [subjectId, topicId, subtopicId, hasResumed]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = async () => {
    if (!currentQuestion || !subjectId || !topicId || !subtopicId) return;

    const correct = selectedOptionId === currentQuestion.correctOptionId;
    const answeredQuestion: AnsweredQuestion = {
      questionId: currentQuestion.id,
      selectedOptionId: selectedOptionId,
      correct,
    };

    const updatedAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      answeredQuestion,
    ];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      const result = await submitQuizAttempt(
        subjectId,
        topicId,
        subtopicId,
        updatedAnswers,
      );
      navigate(routes.quizScore(subjectId, topicId, subtopicId), {
        state: {
          score: result.correct,
          total: result.total,
          passed: result.passed,
          answers: updatedAnswers,
        },
      });
    } else {
      const nextIndex = currentIndex + 1;
       console.log("SAVING:", JSON.stringify(updatedAnswers, null, 2));
      await saveQuizProgress(
        subjectId,
        topicId,
        subtopicId,
        nextIndex,
        updatedAnswers,
      );
      setCurrentIndex(nextIndex);
      setSelectedOptionId(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentQuestion) return <div>No questions found.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 p-4 gap-4">
      <button onClick={() => navigate(-1)} className="text-sm self-start">
        <ArrowLeft size={18} />
      </button>

      <div>
        <h1 className="text-xl font-bold">Quiz</h1>
        <p className="text-sm text-gray-600">{subtopic?.title}</p>
      </div>

      <ProgressBar value={currentIndex + 1} max={questions.length} />

      <QuizQuestion
        questionNumber={currentIndex + 1}
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOptionId={selectedOptionId}
        onSelect={setSelectedOptionId}
      />

      <Button
        type="button"
        onClick={handleNext}
        disabled={selectedOptionId === null}
        styles="bg-orange-400 text-amber-50"
      >
        {isLastQuestion ? "SUBMIT" : "NEXT"}
      </Button>
    </div>
  );
}
