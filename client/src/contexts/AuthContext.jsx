import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  authState: "",
  email: "",
  accessToken: "",
  isAuthenticated: false,
  changeAuthState: (authState = {}) => null,
});

export function AuthContextProvider(props) {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    //TODO: Quick Solution
    // Fix by implementing persisted authState
    localStorage.setItem("accessToken", state.accessToken);

    setAuthState(state);
  };

  const contextData = {
    userId: authState._id,
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const authData = useContext(AuthContext);

  return authData;
}
