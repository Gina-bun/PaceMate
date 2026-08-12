import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Select } from "./Select";
import { ArrowRight } from "lucide-react";

interface WarmUpOrRecapCardProps {
  hasRecapData: boolean;
  recapSubject?: string;
  recapCount?: number;
  subjectOptions: { label: string; value: string }[];
  onStartWarmUp: (subject: string) => void;
  onStartRecap: () => void;
  className?: string;
}

export function WarmUpOrRecapCard({
  hasRecapData,
  recapSubject,
  recapCount,
  subjectOptions,
  onStartWarmUp,
  onStartRecap,
  className,
}: WarmUpOrRecapCardProps) {
  const [selectedSubject, setSelectedSubject] = useState(
    subjectOptions[0]?.value ?? "",
  );

  if (hasRecapData) {
    return (
      <Card variant="review" className={className}>
        <div className="flex h-full flex-col justify-between">
          <div>
            <h2 className="font-semibold mb-1">Missed a few in {recapSubject}</h2>
            <p className="text-sm text-gray-600">
              {recapCount} questions you got wrong before
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              onClick={onStartRecap}
              styles="flex gap-1 items-center bg-orange-400 text-white px-2"
            >
              Start recap
              <ArrowRight size={16}/>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="warmup" className={className}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <h2 className="font-semibold mb-1">Warm-up quiz</h2>
          <p className="text-sm text-gray-600 mb-4">Choose a subject to test your knowledge</p>
          <Select
            label="Subject"
            value={selectedSubject}
            onChange={setSelectedSubject}
            options={subjectOptions}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="button"
            onClick={() => onStartWarmUp(selectedSubject)}
            disabled={!selectedSubject}
            styles="bg-orange-400 text-white"
          >
            Start quiz
          </Button>
        </div>
      </div>
    </Card>
  );
}
    

