
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { TextInput } from "../../components/TextInput";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import { routes } from "../../routes";

export function EditProfileScreen() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("Philomena Cunk");
  const [username, setUsername] = useState("philomena_c");
  const [email, setEmail] = useState("philomena@example.com");

  const {user, setGrade: saveGrade} = useAuth();
  const gradeValue = user?.grade ? user.grade.toString() : "7";
  const [grade, setGrade] = useState(gradeValue);

  const handleSave = () => {
    saveGrade(Number(grade));
    navigate(routes.profile());
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 p-4 gap-5">
      <div>
        <button onClick={() => navigate(-1)} className="text-sm mb-2">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl text-center font-bold">Edit Profile</h1>
      </div>

      <div className="flex justify-center">
        <ProfileAvatar name={fullName} editable onEditClick={() => {}} />
      </div>

      <div className="flex flex-col gap-3">
        <TextInput label="Full Name" value={fullName} onChange={setFullName} />
        <TextInput label="Username" value={username} onChange={setUsername} />
        <TextInput label="Email" type="email" value={email} onChange={setEmail} />
        <Select
          label="Grade"
          value={grade}
          onChange={setGrade}
          options={[
            { label: "Grade 7", value: "7" },
            { label: "Grade 8", value: "8" },
            { label: "Grade 9", value: "9" },
          ]}
        />
      </div>

      <div className="flex flex-row gap-3">
        <Button type="button" onClick={() => navigate(-1)} styles="bg-white border border-gray-300 text-gray-700 flex-1">
          CANCEL
        </Button>
        <Button type="button" onClick={handleSave} styles="bg-orange-400 text-amber-50 flex-1">
          SAVE
        </Button>
      </div>
    </div>
  );
}