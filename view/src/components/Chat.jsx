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
  const [socketError, setSocketError] = useState(null);
  const [sendingPrivateTo, setSendingPrivateTo] = useState(null);

  useEffect(() => {
    socket.connect();
    socket.on("message", (message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    });
    socket.on("error_message", (message) => {
      console.log(message);
    });
    socket.on("disconnect", (reason) => setSocketError(reason));
    socket.on("connect", () => setSocketError(null));
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/chat/getmessages`, {
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
    let finalInput = input;
    if (sendingPrivateTo) {
      finalInput = `/private ${sendingPrivateTo.userId} ${input}`;
      setSendingPrivateTo(null);
    }
    if (finalInput.includes("/private")) {
      const idTo = finalInput.split(" ")[1];
      const message = finalInput.split(" ")[2];
      console.log("Sending private");
      socket.emit("private_message", message, idTo);
      setInput("");
    } else {
      socket.emit("message", finalInput);
      setInput("");
    }
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
        <MessageHistory
          messages={messages}
          setSendingPrivateTo={setSendingPrivateTo}
          socketError={socketError}
        />
        {loading && <p>Loading...</p>}
        <MessageForm
          setInput={setInput}
          input={input}
          sendMessage={sendMessage}
          sendingPrivateTo={sendingPrivateTo}
          setSendingPrivateTo={setSendingPrivateTo}
          socketError={socketError}
        />
      </Grid2>
    </Grid2>
  );
}
