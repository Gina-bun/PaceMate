import { useNavigate, useParams } from "react-router-dom";
import { useCurriculum } from "../../context/CurriculumContext";
import { TopicItem } from "./TopicItem";
import { useState } from "react";

export function SubjectScreen() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { subjects, loading } = useCurriculum();
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const handleToggleSubtopic = (subtopicId: string) => {
    setCompletedIds((prev) =>
      prev.includes(subtopicId)
        ? prev.filter((id) => id !== subtopicId)
        : [...prev, subtopicId],
    );
  };

  if (loading) return <div>loading...</div>;
 


  const subject = subjects.find((s) => s.subject.toLowerCase() === subjectId);

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <div className="bg-orange-400 text-white p-4">
        <button onClick={() => navigate("/dashboard")} className="mb-2 text-sm">
          ← Back
        </button>
        <h1 className="text-xl font-bold">{subject.subject}</h1>
        <p className="text-sm mt-1">
          Build your reading, writing, and comprehension skills.
        </p>
        <p className="text-xs mt-2">{subject.topics.length} topics</p>
      </div>

      <div className="flex flex-col px-4">
        {subject.topics.map((topic) => (
          <TopicItem
            key={topic.id}
            title={topic.title}
            subtopics={topic.subtopics.map((s) => ({
              ...s,
              completed: completedIds.includes(s.id),
            }))}
            onToggleSubtopic={handleToggleSubtopic}
          />
        ))}
      </div>
    </div>
  );
}
