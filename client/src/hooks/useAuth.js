import { useContext } from "react";
import { login, register } from "../api/auth-api";
import { AuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
  const { changeAuthState } = useContext(AuthContext);

  const loginHandler = async (username, password) => {
    const result = await login(username, password);

    changeAuthState(result);

    return result;
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useContext(AuthContext);

  const registerHandler = async (username, password) => {
    const authData = await register(username, password);

    const { password: _, ...dataWithoutPassword } = authData;

    changeAuthState(dataWithoutPassword);

    return dataWithoutPassword;
  };

  return registerHandler;
};
