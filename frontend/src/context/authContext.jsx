/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useLogin } from "../hooks/authRequests.js";



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({
  loginHandler: () => {},
  logoutHandler: () => {},
  isAuth: false,
  isError: false,
  isPending: false,
  isSuccess: false,
  error: null,
  authData: null,
});

export default function AuthProvider({children}) {
  const [isAuth, setIsAuth] = useState(false);
  const { mutate: login, isError, error, isSuccess, data: authData , reset, isPending} = useLogin();

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  }

  const loginHandler = (formValue) => {
    login(formValue);
    if (isSuccess) {
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

      console.log(authData)
      localStorage.setItem("token", authData.token);
      localStorage.setItem("userId", authData.userId);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      
      setAutoLogout(remainingMilliseconds);
      setIsAuth(true);
    } else {
      console.log(error)
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    reset()
    setIsAuth(false);
  }


  return (
    <AuthContext.Provider value={{
      loginHandler,
      logoutHandler,
      isAuth,
      isPending,
      isError,
      isSuccess,
      error,
      authData
    }}>
      {children}
    </AuthContext.Provider>
  );
}