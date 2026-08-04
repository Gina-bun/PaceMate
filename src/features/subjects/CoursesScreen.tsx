import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SubjectCard } from "../../components/SubjectCard";
import { subjects } from "../../data/subjects";
import { useProgress } from "../../context/ProgressContext";
import { getSubjectStatus, getCompletedCount } from "../../utils/subjectStatus";
import { routes } from "../../routes";

export function CoursesScreen() {
  const navigate = useNavigate();
  const { records, loading } = useProgress();

  const withStatus = subjects.map((subject) => ({
    subject,
    status: getSubjectStatus(subject, records),
    completedCount: getCompletedCount(subject, records),
  }));

  const myCourses = withStatus.filter((s) => s.status === "in-progress");
  const available = withStatus.filter((s) => s.status === "available");
  const comingSoon = withStatus.filter((s) => s.status === "coming-soon");

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading your courses…</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex gap-2 items-center mb-4">
        <button
          onClick={() => navigate(routes.dashboard())}
          className="text-sm border p-1 rounded-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold">Courses</h1>
      </div>

      {myCourses.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold mb-2">My Courses</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {myCourses.map(({ subject, completedCount }) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                status="in-progress"
                completedCount={completedCount}
                totalCount={subject.totalSubtopics}
                onClick={() => navigate(routes.subject(subject.id))}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Available Subjects</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {available.map(({ subject }) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              status="available"
              onClick={() => navigate(routes.subject(subject.id))}
            />
          ))}
        </div>
      </section>

      {comingSoon.length > 0 && (
        <section>
          <h2 className="font-semibold mb-2 text-gray-500">Coming Soon</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {comingSoon.map(({ subject }) => (
              <SubjectCard key={subject.id} subject={subject} status="coming-soon" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}