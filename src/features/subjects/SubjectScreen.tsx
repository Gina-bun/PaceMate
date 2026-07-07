
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicItem } from "./TopicItem";

interface Subtopic {
  id: string;
  title: string;
  completed: boolean;
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

const initialTopics: Topic[] = [
  {
    id: "t1",
    title: "Reading Comprehension",
    subtopics: [
      { id: "s1", title: "Identifying Main Ideas", completed: false },
      { id: "s2", title: "Making Inferences", completed: false },
    ],
  },
  {
    id: "t2",
    title: "Grammar Fundamentals",
    subtopics: [
      { id: "s3", title: "Parts of Speech", completed: false },
      { id: "s4", title: "Sentence Structure", completed: false },
    ],
  },
];

export function SubjectScreen() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  const handleToggleSubtopic = (topicId: string, subtopicId: string) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map((s) =>
                s.id === subtopicId ? { ...s, completed: !s.completed } : s
              ),
            }
          : topic
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <div className="bg-orange-400 text-white p-4">
        <button onClick={() => navigate("/dashboard")} className="mb-2 text-sm">
          ← Back
        </button>
        <h1 className="text-xl font-bold">English</h1>
        <p className="text-sm mt-1">Build your reading, writing, and comprehension skills.</p>
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