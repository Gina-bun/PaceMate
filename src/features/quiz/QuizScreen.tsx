
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizQuestion } from "../../components/QuizQuestion";
import { Button } from "../../components/Button";
import { ProgressBar } from "../../components/ProgressBar";
import { useCurriculum } from "../../context/CurriculumContext";
import { ArrowLeft } from "lucide-react";
import { routes } from "../../routes";



export function QuizScreen() {
  const navigate = useNavigate();
  const {subjects, loading, error} = useCurriculum();
  const { subjectId, topicId, subtopicId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const subject = subjects.find((s) => s.subject.toLowerCase() === subjectId);
  const topic = subject?.topics.find((t) => t.id === topicId);
  const subtopic = topic?.subtopics.find((s) => s.id === subtopicId);
  const questions = subtopic?.quiz || [];

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = () => {
    const gotItRight = selectedOptionId === currentQuestion.correctOptionId;
    const updatedScore = gotItRight ? score + 1 : score;

    if (isLastQuestion) {
      navigate(routes.quizScore(subjectId, topicId, subtopicId), {
        state: { score: updatedScore, total: questions.length },
      });
    } else {
      setScore(updatedScore);
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    }
  };

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

      <Button type="button" onClick={handleNext} styles="bg-orange-400 text-amber-50">
        {isLastQuestion ? "SUBMIT" : "NEXT"}
      </Button>
    </div>
  );
}