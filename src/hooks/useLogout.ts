import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { routes } from "../routes";

export function useLogout() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
    await logout();
    navigate(routes.login());
  };

  return handleLogout;
}