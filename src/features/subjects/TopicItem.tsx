import { useNavigate, useParams } from "react-router-dom";
import { Accordion } from "../../components/Accordion";
import { Checkbox } from "../../components/Checkbox";
import type { Subtopic } from "../types";
import { routes } from "../../routes";

export interface TopicItemProps {
  id: string;
  title: string;
  subtopics: Subtopic[];
  onToggleSubtopic: (subtopicId: string) => void;
}

export function TopicItem({
  id,
  title,
  subtopics,
  onToggleSubtopic,
}: TopicItemProps) {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const isTopicComplete = subtopics.every((s) => s.completed);

  return (
    <Accordion
      title={
        <div className="flex items-center gap-2">
          <Checkbox checked={isTopicComplete} onChange={() => {}} />
          <span className="font-medium">{title}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        {subtopics.map((sub) => (
          <div key={sub.id} className="flex items-center gap-2">
            <Checkbox
              checked={sub.completed}
              onChange={() => onToggleSubtopic(sub.id)}
            />
            <span
              className="text-sm text-gray-700"
              onClick={() => navigate(routes.subtopic(subjectId!, id, sub.id ))}
            >
              {sub.title}
            </span>
          </div>
        ))}
      </div>
    </Accordion>
  );
}
