import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import "./MessageHistory.styles.css";
import Message from "./Message";

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
            <Message message={message} />
          </li>
        ))}
      </ul>
    </Paper>
  );
}
