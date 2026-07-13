// features/subjects/TopicScreen.tsx
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";

const learningGoals = [
  "Identify the main idea of a passage",
  "Distinguish between fact and inference",
  "Summarize a text in your own words",
];

const readingResources = [
  { title: "Understanding Main Ideas", url: "#" },
  { title: "How to Make Inferences While Reading", url: "#" },
  { title: "Summary Writing Basics", url: "#" },
];

export function TopicScreen() {
  const navigate = useNavigate();
  const { subjectId, topicId } = useParams();

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Header zone — distinct background, same pattern as Subject screen */}
      <div className="bg-orange-400 text-white p-4">
        <button onClick={() => navigate(-1)} className="mb-2 text-sm">
          ← Back
        </button>
        <p className="text-sm opacity-90">English</p>
        <h1 className="text-xl font-bold">Reading Comprehension</h1>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Key Concept Summary */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-semibold">Key Concept Summary</h2>
            <span className="text-xs text-gray-500">~4 min read</span>
            
          </div>
          <p className="text-sm text-gray-700">
            This topic covers how to identify the main idea of a passage, tell facts apart from
            inferences, and summarize what you've read clearly and briefly.
          </p>
        </div>

        {/* Learning Goals */}
        <div>
          <h2 className="font-semibold mb-1">Learning Goals</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 flex flex-col gap-1">
            {learningGoals.map((goal) => (
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
            {readingResources.map((resource) => (
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
        <Button type="button" onClick={() => navigate(`/subject/${subjectId}/topic/${topicId}/quiz`)} styles="bg-orange-400 text-amber-50 mt-2">
          READY FOR QUIZ
        </Button>
      </div>
    </div>
  );
}