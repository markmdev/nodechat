import { useContext } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Form from "./Form";

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
    navigate("/login");
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
      buttonLabel="Register"
    />
  );
}
