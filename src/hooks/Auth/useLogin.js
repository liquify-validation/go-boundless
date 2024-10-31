import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const { login, loginError, loginLoading } = useAuth();

  return {
    login,
    error: loginError,
    isLoading: loginLoading,
  };
};
