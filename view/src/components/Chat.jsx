import { useEffect } from "react";
import { socket } from "../socket";
import MessageHistory from "./MessageHistory";
import { useState } from "react";
import axios from "axios";
import UsersPanel from "./UsersPanel";
import { Grid2 } from "@mui/material";
import LogoutButton from "./LogoutButton";
import MessageForm from "./MessageForm";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.connect();
    socket.on("message", (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    });
    socket.on("error_message", (message) => {
      console.log(message);
    });
    socket.on("private_message", (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/chat/getmessages", {
        withCredentials: true,
      })
      .then((response) => {
        const newMessages = response.data;
        if (newMessages) {
          setMessages(newMessages);
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sendMessage = () => {
    if (input === "") return;
    if (input.includes("/private")) {
      const idTo = input.split(" ")[1];
      const message = input.split(" ")[2];
      return socket.emit("private_message", message, idTo);
    }
    socket.emit("message", input);
    setInput("");
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        marginX: 2,
        marginTop: 10,
      }}
    >
      <LogoutButton />
      <UsersPanel />
      <Grid2 size={{ xs: 12, md: 9 }}>
        <MessageHistory messages={messages} />
        {loading && <p>Loading...</p>}
        <MessageForm
          setInput={setInput}
          input={input}
          sendMessage={sendMessage}
        />
      </Grid2>
    </Grid2>
  );
}
