import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Select } from "./Select";

interface WarmUpOrRecapCardProps {
  hasRecapData: boolean;
  recapSubject?: string;
  recapCount?: number;
  subjectOptions: { label: string; value: string }[];
  onStartWarmUp: (subject: string) => void;
  onStartRecap: () => void;
}

export function WarmUpOrRecapCard({
  hasRecapData,
  recapSubject,
  recapCount,
  subjectOptions,
  onStartWarmUp,
  onStartRecap,
}: WarmUpOrRecapCardProps) {
  const [selectedSubject, setSelectedSubject] = useState(
    subjectOptions[0]?.value ?? "",
  );

  if (hasRecapData) {
    return (
      <Card variant="review">
        <h2 className="font-semibold mb-1">Missed a few in {recapSubject}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {recapCount} questions you got wrong before
        </p>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={onStartRecap}
            styles="bg-orange-400 text-white"
          >
            Start recap
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="warmup">
      <h2 className="font-semibold mb-1">Warm-up quiz</h2>
      <p className="text-sm text-gray-600 mb-4">Choose a subject to test your knowledge</p>
      <div className="mb-4">
        <Select label="Subject" value={selectedSubject} onChange={setSelectedSubject} options={subjectOptions} />
      </div>
      <div className="flex justify-end">
        <Button type="button" onClick={() => onStartWarmUp(selectedSubject)} disabled={!selectedSubject} styles="bg-orange-400 text-white">
          Start quiz
        </Button>
      </div>
    </Card>
  );
}
