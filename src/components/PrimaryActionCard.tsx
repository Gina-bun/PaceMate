import { Card } from "./Card";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";

type PrimaryActionProps = (
  | { kind: "start"; subject: string; topic: string; onAction: () => void }
  | { kind: "resume-quiz"; subject: string; subtopic: string; questionIndex: number; totalQuestions: number; onAction: () => void }
  | { kind: "continue"; subject: string; subtopic: string; onAction: () => void }
) & {className?: string};

export function PrimaryActionCard(props: PrimaryActionProps) {
  const { heading, subject, detail, buttonLabel, onAction } = (() => {
    switch (props.kind) {
      case "start":
        return { heading: "Start learning", subject: props.subject, detail: props.topic, buttonLabel: "Start", onAction: props.onAction };
      case "resume-quiz":
        return {
          heading: "Continue your quiz",
          subject: props.subject,
          detail: `${props.subtopic} — Question ${props.questionIndex} of ${props.totalQuestions}`,
          buttonLabel: "Resume",
          onAction: props.onAction,
        };
      case "continue":
        return { heading: "Continue learning", subject: props.subject, detail: props.subtopic, buttonLabel: "Continue", onAction: props.onAction };
    }
  })();

 return (
  <Card variant="action" className={props.className}>
    <div className="flex h-full flex-col justify-between">
      <div>
        <p className="text-sm text-orange-100 mb-1">{heading}</p>
        <h2 className="text-lg font-semibold">{subject}</h2>
        <p className="text-sm text-orange-100">{detail}</p>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          type="button"
          onClick={onAction}
          styles="flex items-center px-2 gap-1 bg-white text-orange-600"
        >
          {buttonLabel} <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  </Card>
);
}