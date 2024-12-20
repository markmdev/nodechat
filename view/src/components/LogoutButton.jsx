import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Button
      sx={{
        position: "absolute",
        right: "30px",
        top: "10px",
      }}
      variant="outlined"
      onClick={() => handleLogout()}
    >
      Logout
    </Button>
  );
}
