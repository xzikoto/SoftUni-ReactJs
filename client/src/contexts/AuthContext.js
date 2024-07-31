import { createContext } from "react";

export const AuthContext = createContext({
  authState: "",
  email: "",
  accessToken: "",
  isAuthenticated: false,
  changeAuthState: (authState = {}) => null,
});
