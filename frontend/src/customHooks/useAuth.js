import { useState, useEffect } from "react";

const useAuth = () => {
  // Check if there is a token in localStorage
  const initialLoggedIn = !!localStorage.getItem("adminToken");
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

  // Function to log in
  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
        return data;
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error("WrongPassword");
        } else if (response.status === 404) {
          throw new Error("UserNotFound");
        } else {
          throw new Error(`Login failed: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Function to check if the user is logged in
  const checkLoggedIn = () => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
  };

  // Function to log out
  const logout = async () => {
    await localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  // Effect to check for token in localStorage on mount
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("adminToken"));
  }, []);

  return { isLoggedIn, login, logout, checkLoggedIn };
};

export default useAuth;
