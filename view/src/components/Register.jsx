import { useState } from "react";

export default function Register({ handleRegister }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin("");
    setPassword("");
    handleRegister(login, password);
  };

  return (
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
  );
}
