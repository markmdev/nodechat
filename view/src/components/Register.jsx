import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Register({}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, error, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin("");
    setPassword("");
    handleRegister(login, password);
  };

  if (loading) return <p>Loading...</p>;

  if (user) return <Navigate to="/" />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Login</label>
        <input
          type="text"
          name="username"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        ></input>
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <br />
        <button type="submit">Register</button>
      </form>
      {error && (
        <>
          {error}
          <br />
        </>
      )}
      <Link to="/">Main page</Link>
    </>
  );
}
