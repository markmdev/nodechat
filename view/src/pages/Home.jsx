import { Box, Button, Card, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
      }}
    >
      <Card
        elevation={20}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        <Box>
          <Link to="/login">
            <Button size="large" sx={{ fontSize: 30 }} variant="contained">
              Login
            </Button>
          </Link>
        </Box>
        <br />
        <Box>
          <Link to="/register">
            <Button
              size="large"
              sx={{ fontSize: 30, marginTop: 5 }}
              variant="contained"
            >
              Register
            </Button>
          </Link>
        </Box>
        <br />
      </Card>
    </Container>
  );
}
