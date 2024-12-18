import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { socket } from "./socket";
import Login from "./components/Login";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import Register from "./components/Register";
import { useContext } from "react";
import { Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const { handleLogout, error, setError } = useContext(AuthContext);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setError("");
    axios
      .get("http://localhost:8000/auth/token", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError(error.message);
        }
      });
  }, []);

  return (
    <>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <button onClick={() => handleLogout()}>Logout</button>
      {user && user.username}
      {error}
    </>
  );
}

export default App;
