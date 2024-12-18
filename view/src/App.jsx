import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { socket } from "./socket";
import Login from "./components/Login";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((response) => {
        console.log(response);
        if (response.response) {
          setError(response.response.statusText);
        }
      });
  }, []);

  const handleRegister = async (username, password) => {
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
      setError(error.message);
    }
  };

  const handleLogin = async (username, password) => {
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
      setError(error.message);
    }
  };

  return (
    <>
      <Login handleLogin={handleLogin} />
      <Register handleRegister={handleRegister} />
      {user && user.username}
      {error}
    </>
  );
}

export default App;
