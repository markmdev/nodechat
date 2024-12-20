import { Paper } from "@mui/material";

const formatDate = (timestampz) => {
  const date = new Date(timestampz.replace(" ", "T"));
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate.replace(",", "");
};

export default function MessageHistory({ messages }) {
  return (
    <Paper elevation={16}>
      <ul style={{ listStyleType: "none" }}>
        {messages.map((message) => (
          <li key={message.id}>
            <b>{message.users.username}:</b> {message.message}{" "}
            <i>({formatDate(message.created_at)}</i>)
          </li>
        ))}
      </ul>
    </Paper>
  );
}
