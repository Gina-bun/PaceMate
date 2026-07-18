import { Link, useNavigate } from "react-router-dom";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/Button";
import { routes } from "../../routes";

const user = { name: "Philomena Cunk", email: "philomena@example.com" }; // add real user data later

const menuItems = [
  {label: "Edit Profile", path: routes.editProfile()},
  {label: "Terms and Conditions", path: routes.terms()},
  {label: "Help and Support", path: routes.help()},
];

export function ProfileScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="text-sm mb-2">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-center">Profile</h1>
      </div>

      <div className="bg-orange-400 rounded-md mx-4 p-4 flex flex-col items-center gap-2 text-white">
        <ProfileAvatar name={user.name} />
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm opacity-90">{user.email}</p>
      </div>

      <div className="flex flex-col mt-6 px-4">
        {menuItems.map((item) => (
          <Link
          key={item.path}
          to={item.path}
          className="text-left py-3 border-b border-gray-200"
          >
            {item.label}
          </Link>
        ))}

        <Button
          onClick={() => {
            // add real logout logic later
          }}
          styles="text-left py-3 text-orange-600 font-medium flex items-center gap-2 mt-2"
        >
          Log Out ⎋
        </Button>
      </div>
    </div>
  );
}