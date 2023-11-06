// UserContext.js
import { createContext, useContext, useState } from "react";
import AxiosApi from "../api/AxiosApi";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [token, setToken] = useState(null);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsLoggedin(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedin(false);
  };

  // 컨텍스트에 checkLoginStatus 함수 추가
  const checkLoginStatus = async () => {
    try {
      const token = window.localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰 가져오기
      const response = await AxiosApi.checkLogin(token); // 토큰을 인자로 전달
      if (response.data === "User is logged in") {
        login(response.data, token);
        console.log("로그인 상태");
      } else {
        logout();
        console.log("로그아웃 상태");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      logout();
    }
  };
  // 컨텍스트에 checkLoginStatus 함수 추가
  const contextValue = {
    user,
    isLoggedin,
    login,
    logout,
    checkLoginStatus,
    token,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
