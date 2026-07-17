import { NavLink } from "react-router-dom";
import { routes } from "../routes";

type NavVariant = "bottom" | "side";

interface NavProps {
  variant: NavVariant;
}

const navItems = [
  { label: "Home", path: routes.dashboard() },
  { label: "Profile", path: routes.profile() },
  { label: "Settings", path: routes.settings() },
];

const variantStyles: Record<NavVariant, string> = {
  bottom: "flex-row justify-around items-center border-t py-3",
  side: "flex-col gap-4 w-48 border-r p-4",
};

export function Nav({ variant }: NavProps) {
 

  return (
    <nav className={`flex border-gray-200 bg-white ${variantStyles[variant]}`}>
      {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({isActive}) => `text-sm ${variant === "side" ? "text-left" : ""} ${
              isActive ? "text-orange-500 font-semibold" : "text-gray-500"
            }`
          }
          >
            {item.label}
          </NavLink>
        
      ))}
    </nav>
  );
}