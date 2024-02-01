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
        // Set the token in localStorage
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
        return data;
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  // Effect to check for token in localStorage on mount
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("adminToken"));
  }, []);

  return { isLoggedIn, login, logout };
};

export default useAuth;
