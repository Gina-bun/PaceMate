import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Topic } from "../types";
import type { SubjectData } from "../types";
import subjectData from "../../data/social-studies-jhs1.json";
import { TopicItem } from "./TopicItem";


export function SubjectScreen() {
  const data = subjectData as SubjectData;

  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>(data.topics);

  const subjectName = subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : "Subject";

  const handleToggleSubtopic = (topicId: string, subtopicId: string) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map((s) =>
                s.id === subtopicId ? { ...s, completed: !s.completed } : s,
              ),
            }
          : topic,
      ),
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <div className="bg-orange-400 text-white p-4">
        <button onClick={() => navigate("/dashboard")} className="mb-2 text-sm">
          ← Back
        </button>
        <h1 className="text-xl font-bold">{subjectName}</h1>
        <p className="text-sm mt-1">
          Build your reading, writing, and comprehension skills.
        </p>
        <p className="text-xs mt-2">{topics.length} topics</p>
      </div>

      <div className="flex flex-col px-4">
        {topics.map((topic) => (
          <TopicItem
            key={topic.id}
            title={topic.title}
            subtopics={topic.subtopics}
            onToggleSubtopic={(subId) => handleToggleSubtopic(topic.id, subId)}
          />
        ))}
      </div>
    </div>
  );
}
