import { NavLink } from "react-router-dom";
import { routes } from "../routes";
import { Home, BookOpen, User, Settings, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import logo from "../assets/logo.png";
import mobileLogo from "../assets/logo-mobile.png";
import { ConfirmDialog } from "./ConfirmDialog";

type NavVariant = "bottom" | "side";

interface NavProps {
  variant: NavVariant;
}

const navItems = [
  { label: "Dashboard", path: routes.dashboard(), icon: Home },
  { label: "Courses", path: routes.courses(), icon: BookOpen},
  { label: "Profile", path: routes.profile(), icon: User },
  { label: "Settings", path: routes.settings(), icon: Settings }, 
];

export function Nav({ variant }: NavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleLogout = useLogout();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
 

  if (variant === "bottom") {
    return (
      <nav className="flex justify-around items-center border-t py-3 border-gray-200 bg-white">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({isActive}) =>
                `flex flex-col items-center gap-1 text-sm ${
                  isActive ? "text-orange-500 rounded-md font-semibold" : "text-gray-500"
                }`
              }
              >
                <Icon size={22} strokeWidth={2}/>
                 <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    );
  }

  //sidebar variant
  return (
    <nav
    className={`flex flex-col border-r border-gray-200 bg-white h-screen transition-all duration-200 ${
      collapsed ? "w-20" : "w-56"
    }`}
    >
      {/* logo + collapse toggle */}
      <div className={`flex items-center py-5 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <img src={logo} alt="logo" className="h-15 ml-6 object-contain w-fit"/>
          )}
          {collapsed && (
            <img src={mobileLogo} alt="logo" className="h-9 w-full  object-contain"/>
          )}
         
         <div className="relative">
           <Button
          onClick={() => setCollapsed(!collapsed)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          styles="absolute -right-2 text-gray-600 hover:text-gray-700 bg-orange-200 rounded"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={11} strokeWidth={3}/> : <ChevronLeft size={22} strokeWidth={2} />}
          </Button>

        {showTooltip && (
          <div className="absolute top-full mt-2 right-0 whitespace-nowrap bg-gray-900 text-white text-[9px] px-2 py-1 rounded shadow-lg z-50">
            {collapsed ? "Expand" : "Collapse"}
          </div>
        )}
         </div>
      </div>

      {/* Main nav links */}
      <div className="flex flex-col gap-1 px-3 mt-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({isActive}) => 
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    collapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-orange-50 text-orange-500 font-semibold"
                      : "text-gray-500 hover:bg-gray-50"
                  }`
                }
              >
                <Icon size={23} strokeWidth={2} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
      </div>

      {/* Logout, separated at the bottom */}
      <div className=" border-gray-200 px-3 py-3">
          <Button
          onClick={() => setShowLogoutConfirm(true)}
          styles={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full ${
            collapsed ? `justify-center` : ``
          }`}
          >
             <LogOut size={20} strokeWidth={2} />
          {!collapsed && <span>Log out</span>}
          </Button>
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

    </nav>
  )
}