import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import "./MessageHistory.styles.css";

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
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Paper
      elevation={2}
      sx={{
        paddingX: 1,
        paddingY: 0.5,
        height: "400px",
        overflowY: "scroll",
      }}
      ref={scrollRef}
    >
      <ul style={{ listStyleType: "none" }}>
        {messages.map((message) => (
          <li key={message.id}>
            <img src="https://i.pravatar.cc/20" className="ava" />
            <div className="messageMain">
              <b>{message.users.username}:</b>{" "}
              <span className="messageText">{message.message}</span>{" "}
            </div>
            <i className="messageDate">({formatDate(message.created_at)})</i>
          </li>
        ))}
      </ul>
    </Paper>
  );
}
