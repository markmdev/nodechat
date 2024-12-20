import SendIcon from "@mui/icons-material/Send";
import { Box, TextField, Button } from "@mui/material";

export default function MessageForm({ setInput, input, sendMessage }) {
  return (
    <Box
      sx={{
        marginTop: 3,
      }}
    >
      <TextField
        sx={{ marginTop: 2 }}
        fullWidth
        variant="outlined"
        helperText="Message"
        size="large"
        value={input}
        onChange={({ target }) => setInput(target.value)}
      />
      <Button
        variant="contained"
        onClick={sendMessage}
        endIcon={<SendIcon />}
        sx={{ height: "50px" }}
      >
        Send
      </Button>
    </Box>
  );
}
