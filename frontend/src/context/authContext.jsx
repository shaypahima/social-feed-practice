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
  isLoadingLogin: false,
  init: () => {}
});

export default function AuthProvider({children}) {
  const [isAuth, setIsAuth] = useState(false);
  const [isPending, setIsPending] = useState(false);
  
  const { mutate: login, isError, error, isSuccess, data: authData , reset, isPending : isLoadingLogin} = useLogin();

  const init = () => {
    setIsPending(true);
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    const userId = localStorage.getItem("userId");
  

    if (!token || !expiryDate) {
      setIsAuth(false);
      setIsPending(false);
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      setIsAuth(false);
      setIsPending(false);
      logoutHandler();
      return;
    }

    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setIsAuth(true);
    setAutoLogout(remainingMilliseconds);
    setIsPending(false);
  }

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
      isLoadingLogin,
      isError,
      isSuccess,
      error,
      authData,
      init
    }}>
      {children}
    </AuthContext.Provider>
  );
}