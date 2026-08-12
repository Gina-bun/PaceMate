import { useNavigate, useParams } from "react-router-dom";
import { useCurriculum } from "../../context/CurriculumContext";
import { useProgress } from "../../context/ProgressContext";
import { TopicItem } from "./TopicItem";
import { ArrowLeft } from "lucide-react";
import { routes } from "../../routes";

export function SubjectScreen() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { subjects, loading, error } = useCurriculum();
  const { isSubtopicComplete } = useProgress();

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const subject = subjects.find((s) => s.subject.toLowerCase() === subjectId);

  if (!subject) {
    return <div className="p-4">Subject not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 gap-2 px-4 pt-2">
      <div className="flex bg-orange-400 text-white gap-2 p-4 md:w-[80vw] lg:w-[60vw] mx-auto">
        <button
          onClick={() => navigate(routes.dashboard())}
          className="mb-2 text-sm border p-1 rounded-sm self-start"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold">{subject.subject}</h1>
          <p className="text-sm mt-1">
            Build your reading, writing, and comprehension skills.
          </p>
          <p className="text-xs mt-2">{subject.topics.length} topics</p>
        </div>
      </div>

      <div className="flex flex-col px-4 border rounded-sm md:w-[80vw] lg:w-[60vw] mx-auto bg-gray-50">
        {subject.topics.map((topic) => (
          <TopicItem
            key={topic.id}
            id={topic.id}
            title={topic.title}
            subtopics={topic.subtopics.map((s) => ({
              ...s,
              completed: isSubtopicComplete(subjectId!, topic.id, s.id),
            }))}
          />
        ))}
      </div>
    </div>
  );
}