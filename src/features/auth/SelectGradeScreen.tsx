import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { grades } from "../../utils/grades";

export function SelectGradeScreen() {
  const navigate = useNavigate();
  const {setGrade} = useAuth();

  const handleSelectGrade = (grade: (typeof grades)[number]) => {
    setGrade(grade);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6 h-screen items-center justify-center bg-amber-50 px-6">
      <h1 className="text-2xl font-bold">Select Your Grade</h1>
      <div className="flex flex-col gap-3 w-full sm:w-[50vw]">
       {
        grades.map((grade) => (
          <Button
            key={grade}
            type="button"
            onClick={() => handleSelectGrade(grade)}
            styles="bg-orange-400 text-amber-50"
          >
            Grade {grade}
          </Button>
        ))
       }
      </div>
    </div>
  );
}