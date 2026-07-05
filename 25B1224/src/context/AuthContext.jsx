import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );

  async function login(username, password) {
    const response = await axiosInstance.post("/auth/login/", {
      username,
      password,
    });

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    setIsLoggedIn(true);
  }

  async function register(username, password) {
    await axiosInstance.post("/auth/register/", {
      username,
      password,
    });
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}