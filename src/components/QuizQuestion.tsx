
import { Card } from "./Card";

interface Option {
  id: string;
  text: string;
}

interface QuizQuestionProps {
  questionNumber: number;
  question: string;
  options: Option[];
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

export function QuizQuestion({
  questionNumber,
  question,
  options,
  selectedOptionId,
  onSelect,
}: QuizQuestionProps) {
  return (
    <Card variant="question">
      <h2 className="font-semibold mb-2">Question {questionNumber}</h2>
      <p className="mb-4">{question}</p>

      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <Card key={option.id} variant="option" onClick={() => onSelect(option.id)}>
            <div className="flex justify-between items-center">
              <span>{option.text}</span>
              <input
                type="checkbox"
                checked={selectedOptionId === option.id}
                onChange={() => onSelect(option.id)}
                className="accent-orange-400"
              />
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}