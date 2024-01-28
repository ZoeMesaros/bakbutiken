import { useState } from "react";

// Custom hook for handling authentication logic
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Functionality to handle user login and send the post request
  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      //If response was successful set the setIsLoggedIn state to true
      if (response.ok) {
        const data = await response.json();
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

  //Functionality to handle user logout
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        setIsLoggedIn(false);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  return { isLoggedIn, login, logout };
};

export default useAuth;
