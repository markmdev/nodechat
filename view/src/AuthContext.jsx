import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const handleRegister = async (username, password) => {
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        { username, password },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError(error.message);
      }
    }
  };

  const handleLogin = async (username, password) => {
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        { username, password },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError(error.message);
      }
    }
  };

  const handleLogout = async () => {
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ handleRegister, handleLogin, handleLogout, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
