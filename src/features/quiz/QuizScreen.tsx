
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizQuestion } from "../../components/QuizQuestion";
import { Button } from "../../components/Button";
import { ProgressBar } from "../../components/ProgessBar";

const questions = [
  {
    id: "q1",
    question: "Which of these is a noun?",
    options: [
      { id: "a", text: "Run" },
      { id: "b", text: "Quickly" },
      { id: "c", text: "Table" },
      { id: "d", text: "Beautiful" },
    ],
    correctOptionId: "c",
  },
  {
    id: "q2",
    question: "Which of these is a verb?",
    options: [
      { id: "a", text: "Jump" },
      { id: "b", text: "Chair" },
      { id: "c", text: "Slow" },
      { id: "d", text: "Green" },
    ],
    correctOptionId: "a",
  },
];

export function QuizScreen() {
  const navigate = useNavigate();
  const { subjectId, topicId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = () => {
    const gotItRight = selectedOptionId === currentQuestion.correctOptionId;
    const updatedScore = gotItRight ? score + 1 : score;

    if (isLastQuestion) {
      navigate(`/subject/${subjectId}/topic/${topicId}/quiz-score`, {
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
        ← Back
      </button>

      <div>
        <h1 className="text-xl font-bold">Quiz</h1>
        <p className="text-sm text-gray-600">English: Parts of Speech</p>
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