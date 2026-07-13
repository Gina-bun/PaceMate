import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useGrade } from "../../context/GradeContext";

export function SelectGradeScreen() {
  const navigate = useNavigate();
  const {setGrade} = useGrade();

  const handleSelectGrade = (grade: 7 | 8 | 9) => {
    setGrade(grade);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6 h-screen items-center justify-center bg-amber-50 px-6">
      <h1 className="text-2xl font-bold">Select Your Grade</h1>
      <div className="flex flex-col gap-3 w-full sm:w-[50vw]">
        <Button type="button" onClick={() => handleSelectGrade(7)} styles="bg-orange-400 text-amber-50">
          Grade 7
        </Button>
        <Button type="button" onClick={() => handleSelectGrade(8)} styles="bg-orange-400 text-amber-50">
          Grade 8
        </Button>
        <Button type="button" onClick={() => handleSelectGrade(9)} styles="bg-orange-400 text-amber-50">
          Grade 9
        </Button>
      </div>
    </div>
  );
}