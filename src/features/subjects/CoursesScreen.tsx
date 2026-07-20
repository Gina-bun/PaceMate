import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import { routes } from "../../routes";

const subjects = ["Mathematics", "Science", "English", "Social Studies"];

export function CoursesScreen() {
  const navigate = useNavigate();

  return (
    <div>
        {/* heading */}
      <div>
        <h1 className="text-xl font-bold">Courses</h1>
        
      </div>

         {/* Courses */}
      <div>
        <h2 className="font-semibold mb-2">Available Subjects</h2>
        <div className="grid grid-cols-2 gap-3">
          {subjects.map((subject) => (
            <Card
              key={subject}
              variant="subject"
              onClick={() => navigate(routes.subject(subject.toLowerCase()))}
            >
              <p className="font-medium">{subject}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
