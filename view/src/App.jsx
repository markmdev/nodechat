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
import Chat from "./components/Chat";

function App() {
  const { handleLogout, user, loading } = useContext(AuthContext);
  const [error, setError] = useState(null);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <br />
        {error}
      </>
    );
  }

  return (
    <>
      <Chat user={user} />
      <br />
      <button onClick={() => handleLogout()}>Logout</button>
      {error}
    </>
  );
}

export default App;
