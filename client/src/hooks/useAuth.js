import { login, logout, register } from "../api/auth-api";
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

export const useGoogleLoginCustomHook = () => {
  const { changeAuthState } = useAuthContext();

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);

      const authData = {};
      changeAuthState(authData);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });

  const loginHandler = async () => {
    await googleLogin();
  };

  return loginHandler;
};

export const useGoogleLogin = () => {
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

export const useLogout = () => {
  const { logout: localLogout } = useAuthContext();

  const logoutHandler = async () => {
    localLogout();
    await logout();
  };

  return logoutHandler;
};
