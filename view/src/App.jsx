import { useState } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./pages/Home";

function App() {
  const { user, loading, error } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Home />;
  }

  return (
    <>
      <Chat user={user} />
      <br />
      {error}
    </>
  );
}

export default App;
