import { Link, useNavigate } from "react-router-dom";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "../../components/Button";
import { routes } from "../../routes";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { useState } from "react";

const menuItems = [
  { label: "Edit Profile", path: routes.editProfile() },
  { label: "Terms and Conditions", path: routes.terms() },
  { label: "Help and Support", path: routes.help() },
];

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleLogout = useLogout();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="text-sm mb-2">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-center">Profile</h1>
      </div>

      <div className="rounded-md mx-4 flex flex-col items-center gap-2 text-white">
        <ProfileAvatar height={18} width={18} name={user?.name || ""} />
        <p className="font-semibold text-gray-900">{user?.name || ""}</p>
        <p className="text-sm opacity-90 text-gray-900">{user?.email || ""}</p>
      </div>

      {/* Centered container, mobile: full width / tablet: 480px / desktop: 400px */}
      <div className="flex justify-center mt-6 px-4">
        <div className="w-full md:w-120 lg:w-100 bg-transparent md:border  border-gray-300 rounded-lg p-6 md:p-8 lg:p-6">
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-left py-3 border-b border-gray-200 last:border-b-0"
              >
                {item.label}
              </Link>
            ))}

            <Button
              onClick={() => setShowLogoutConfirm(true)}
              styles="text-left py-3 text-orange-600 font-medium flex items-center gap-2 mt-2"
            >
              <LogOut size={18} /> Log Out
            </Button>
          </div>
        </div>
      </div>

        <ConfirmDialog
        open={showLogoutConfirm}
        title="Confirm Logout"
        message="You'll need to sign in again to access your account."
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}
