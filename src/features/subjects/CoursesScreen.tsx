import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import { routes } from "../../routes";
import { ArrowLeft } from "lucide-react";

const subjects = ["Mathematics", "Science", "English", "Social Studies"];

export function CoursesScreen() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex gap-2">
         <button
          onClick={() => navigate(routes.dashboard())}
          className="mb-2 text-sm border p-1 rounded-sm self-start"
        >
          <ArrowLeft size={18} />
        </button>
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
