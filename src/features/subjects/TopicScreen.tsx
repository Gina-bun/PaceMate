// features/subjects/TopicScreen.tsx
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { useCurriculum } from "../../context/CurriculumContext";
import { ArrowLeft } from "lucide-react";
import { routes } from "../../routes";
import { toSlug } from "../../utils/slug";

export function TopicScreen() {
  const {subjects} = useCurriculum();
  const navigate = useNavigate();
  const { subjectId, topicId, subtopicId } = useParams();

    const subject = subjects.find((s) => toSlug(s.subject) === subjectId);
    const topic = subject?.topics.find((t) => t.id === topicId);
    const subtopic = topic?.subtopics.find((s) => s.id === subtopicId);

      if (!subject || !topic || !subtopic) {
    return <div className="p-4">Content not found.</div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Header zone — distinct background, same pattern as Subject screen */}
      <div className="bg-orange-400 text-white p-4">
        <button onClick={() => navigate(-1)} className="mb-2 text-sm">
          <ArrowLeft size={18} />
        </button>
        <p className="text-sm opacity-90">{subject.subject}</p>
        <h1 className="text-xl font-bold">{subtopic?.title}</h1>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Key Concept Summary */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-semibold">Key Concept Summary</h2>
            <span className="text-xs text-gray-500">~4 min read</span>
            
          </div>
          <p className="text-sm text-gray-700">
            {subtopic.keyConceptSummary}
          </p>
        </div>

        {/* Learning Goals */}
        <div>
          <h2 className="font-semibold mb-1">Learning Goals</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 flex flex-col gap-1">
            {subtopic.learningGoals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </div>

        {/* Curated Resources */}
        <div>
          <h2 className="font-semibold mb-2">Curated Resources</h2>

          <div className="aspect-video w-full mb-3">
            <iframe
              className="w-full h-full rounded-md"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Topic video"
              allowFullScreen
            />
          </div>

          <ul className="flex flex-col gap-2">
            {subtopic.resources.map((resource) => (
              <li key={resource.title}>
                <a
                
                  href={resource.url}
                  className="text-sm text-orange-500 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Button type="button" onClick={() => navigate(routes.quiz(subjectId!, topicId!, subtopicId!))} styles="bg-orange-400 text-amber-50 mt-2">
          READY FOR QUIZ
        </Button>
      </div>
    </div>
  );
}