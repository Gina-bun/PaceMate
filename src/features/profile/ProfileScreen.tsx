
import { useNavigate } from "react-router-dom";
import { ProfileAvatar } from "../../components/ProfileAvatar";

const user = { name: "Philomena Cunk", email: "philomena@example.com" }; // TODO: real user data later

export function ProfileScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="text-sm mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      <div className="bg-orange-400 rounded-md mx-4 p-4 flex flex-col items-center gap-2 text-white">
        <ProfileAvatar name={user.name} />
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm opacity-90">{user.email}</p>
      </div>

      <div className="flex flex-col mt-6 px-4">
        <button onClick={() => navigate("/edit-profile")} className="text-left py-3 border-b border-gray-200">
          Edit Profile
        </button>
        <button onClick={() => navigate("/terms")} className="text-left py-3 border-b border-gray-200">
          Terms and Conditions
        </button>
        <button onClick={() => navigate("/help")} className="text-left py-3 border-b border-gray-200">
          Help and Support
        </button>
        <button
          onClick={() => {
            // TODO: real logout logic later
          }}
          className="text-left py-3 text-orange-600 font-medium flex items-center gap-2 mt-2"
        >
          Log Out ⎋
        </button>
      </div>
    </div>
  );
}