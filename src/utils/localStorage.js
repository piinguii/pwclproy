"use client";

const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const setUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }
  return null;
};

const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

const LocalStorageManager = {
  setToken,
  getToken,
  setUser,
  getUser,
  logout,
};

export default LocalStorageManager;
