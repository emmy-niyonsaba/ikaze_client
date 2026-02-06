import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function useAuth() {
  const navigate = useNavigate();
  const { user, token, login, logout } = useAuthStore();

  // LOGIN wrapper
  const handleLogin = useCallback(
    async (userData, jwtToken) => {
      login(userData, jwtToken); // store login in authStore
      navigate("/"); // redirect after login
    },
    [login, navigate]
  );

  // LOGOUT wrapper
  const handleLogout = useCallback(() => {
    logout(); // clear store
    navigate("/login"); // redirect to login
  }, [logout, navigate]);

  return {
    user,
    token,
    isAuthenticated: !!token,
    login: handleLogin,
    logout: handleLogout,
  };
}
