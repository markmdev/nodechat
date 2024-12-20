import { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Form from "./Form";

export default function Login({}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, user, loading } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin("");
    setPassword("");
    handleLogin(login, password);
  };

  if (loading) return <p>Loading...</p>;

  if (user) return <Navigate to="/" />;

  return (
    <Form
      setLogin={setLogin}
      handleSubmit={handleSubmit}
      setPassword={setPassword}
      error={error}
      login={login}
      password={password}
      buttonLabel="Login"
    />
  );
}
