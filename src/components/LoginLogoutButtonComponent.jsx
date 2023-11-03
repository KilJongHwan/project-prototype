import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Context";
import AxiosApi from "../api/AxiosApi";

const LoginLogoutButton = () => {
  const { isAuthed, logout } = useUser();
  const navigate = useNavigate(); // 사용자의 경로 변경을 위해 사용

  const handleLoginLogout = async () => {
    if (isAuthed) {
      // 이미 로그인된 경우 로그아웃 처리
      await AxiosApi.logout(); // AxiosApi에서 로그아웃 처리하는 메서드를 추가해야 합니다.
      logout();
      navigate("/"); // 로그아웃 후 홈페이지 또는 원하는 경로로 이동
    } else {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  return (
    <button onClick={handleLoginLogout}>{isAuthed ? "Logout" : "Login"}</button>
  );
};

export default LoginLogoutButton;
