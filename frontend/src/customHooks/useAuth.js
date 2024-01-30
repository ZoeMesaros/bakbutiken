import { useState } from "react";

//Custom hook for admin authentication
const useAuth = () => {
  //State to track when an admin is logged in/out
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Send an asynchronous API request to log into the admin page
  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      // If login was successful, set the isLoggedIn state to true
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

  // Async function for sending an API request to log out of the admin page
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/logout", {
        method: "POST",
      });

      //If successful log out, set the isLoggedIn state to false
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

  //Return the login state, and response of the login and logout functions
  return { isLoggedIn, login, logout };
};

export default useAuth;
