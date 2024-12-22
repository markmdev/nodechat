import SendIcon from "@mui/icons-material/Send";
import { Box, TextField, Button, Chip } from "@mui/material";

export default function MessageForm({
  setInput,
  input,
  sendMessage,
  sendingPrivateTo,
  setSendingPrivateTo,
  socketError,
}) {
  return (
    <Box
      sx={{
        marginTop: 3,
      }}
    >
      {sendingPrivateTo && (
        <Chip
          label={`Sending private to ${sendingPrivateTo.username}`}
          variant="outlined"
          onDelete={() => setSendingPrivateTo(null)}
        />
      )}
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
        disabled={socketError ? true : false}
        onClick={sendMessage}
        endIcon={<SendIcon />}
        sx={{ height: "50px" }}
      >
        Send
      </Button>
    </Box>
  );
}
