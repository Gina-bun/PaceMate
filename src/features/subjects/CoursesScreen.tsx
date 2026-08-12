import { useNavigate } from "react-router-dom";
import { SubjectCard } from "../../components/SubjectCard";
import { subjects } from "../../data/subjects";
import { useProgress } from "../../context/ProgressContext";
import { useCurriculum } from "../../context/CurriculumContext";
import { getSubjectStatus, getCompletedCount } from "../../utils/subjectStatus";
import { routes } from "../../routes";
import { Carousel } from "../../components/Carousel";
import { normalize } from "../../utils/normalize";


export function CoursesScreen() {
  const navigate = useNavigate();
  const { records, loading: progressLoading } = useProgress();
  const {subjects: curriculumSubjects, loading: curriculumLoading} = useCurriculum();

   const withStatus = subjects.map((subject) => {
    const curriculumMatch = curriculumSubjects.find(
      (cs) => normalize(cs.subject) === normalize(subject.slug),
    );
    const totalCount =
      curriculumMatch?.topics.reduce((sum, t) => sum + t.subtopics.length, 0) ?? 0;

    return {
      subject,
      status: getSubjectStatus(subject, records),
      completedCount: getCompletedCount(subject, records),
      totalCount,
      navId: curriculumMatch?.subject.toLowerCase() ?? subject.slug,
    };
  });

  const myCourses = withStatus.filter((s) => s.status === "in-progress");
  const available = withStatus.filter((s) => s.status === "available");
  const comingSoon = withStatus.filter((s) => s.status === "coming-soon");

  if (progressLoading || curriculumLoading) {
    return (
      <div className="p-4 text-sm text-gray-500">Loading your courses…</div>
    );
  }

  return (
    <div className="p-4 w-full md:max-w-6xl mx-auto">

      {myCourses.length > 0 && (
        <section className="mb-5">
          <h2 className="font-semibold mb-2">My Courses</h2>
          <div className="min-w-0">
            <Carousel>
              {myCourses.map(({ subject, completedCount , totalCount, navId}) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  status="in-progress"
                  completedCount={completedCount}
                  totalCount={totalCount}
                  onClick={() => navigate(routes.subject(navId))}
                />
              ))}
            </Carousel>
          </div>
        </section>
      )}

      <section className="mb-5">
        <h2 className="font-semibold mb-2">Available Subjects</h2>
        <div className=" min-w-0">
          <Carousel>
            {available.map(({ subject, navId }) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                status="available"
                onClick={() => navigate(routes.subject(navId))}
              />
            ))}
          </Carousel>
        </div>
      </section>

      {comingSoon.length > 0 && (
        <section>
          <h2 className="font-semibold mb-2 text-gray-500">Coming Soon</h2>
          <div className="min-w-0">
            <Carousel>
              {comingSoon.map(({ subject, navId }) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  status="coming-soon"
                  onClick={() => navigate(routes.subject(navId))}
                />
              ))}
            </Carousel>
          </div>
        </section>
      )}
    </div>
  );
}
