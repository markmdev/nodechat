import { Button, Card, TextField, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Form({
  setLogin,
  handleSubmit,
  setPassword,
  error,
  login,
  password,
  buttonLabel,
}) {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
      }}
    >
      <Card
        elevation={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Required"
            helperText="Login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Required"
            helperText="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <Button type="submit" variant="contained">
            {buttonLabel}
          </Button>
        </form>

        {error && (
          <>
            {error}
            <br />
          </>
        )}
        <Link to="/">
          <Button variant="outlined" sx={{ marginTop: 4 }}>
            Main page
          </Button>
        </Link>
      </Card>
    </Container>
  );
}
