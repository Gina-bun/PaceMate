
import { useNavigate, useLocation } from "react-router-dom";

type NavVariant = "bottom" | "side";

interface NavProps {
  variant: NavVariant;
}

const navItems = [
  { label: "Home", path: "/dashboard" },
  { label: "Profile", path: "/profile" },
  { label: "Settings", path: "/settings" },
];

const variantStyles: Record<NavVariant, string> = {
  bottom: "flex-row justify-around items-center border-t py-3",
  side: "flex-col gap-4 w-48 border-r p-4",
};

export function Nav({ variant }: NavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={`flex border-gray-200 bg-white ${variantStyles[variant]}`}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`text-sm ${variant === "side" ? "text-left" : ""} ${
              isActive ? "text-orange-500 font-semibold" : "text-gray-500"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}