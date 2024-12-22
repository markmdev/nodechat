import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import "./MessageHistory.styles.css";
import Message from "./Message";

export default function MessageHistory({
  messages,
  setSendingPrivateTo,
  socketError,
}) {
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
            <Message
              message={message}
              setSendingPrivateTo={setSendingPrivateTo}
            />
          </li>
        ))}
        {socketError && (
          <li style={{ color: "red", fontSize: "2rem" }}>Loading.........</li>
        )}
      </ul>
    </Paper>
  );
}
