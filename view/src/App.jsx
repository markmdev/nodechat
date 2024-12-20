import { useState } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./pages/Home";

function App() {
  const { handleLogout, user, loading } = useContext(AuthContext);
  const [error, setError] = useState(null);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Home />;
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
