import { login, register } from "../api/auth-api";
import { useAuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
  const { changeAuthState } = useAuthContext();

  const loginHandler = async (username, password) => {
    const { password: _, ...authData } = await login(username, password);

    changeAuthState(authData);

    return authData;
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useAuthContext();

  const registerHandler = async (username, password) => {
    const { password: _, ...authData } = await register(username, password);

    changeAuthState(authData);

    return authData;
  };

  return registerHandler;
};
