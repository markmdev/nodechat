import { useContext } from "react";
import "./Message.styles.css";
import { AuthContext } from "../AuthContext";

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
  return formattedDate.replace(",", "").split(" ").slice(1);
};

export default function Message({ message }) {
  const { user } = useContext(AuthContext);
  const username = user.username;
  let privateMessageClass = "";
  if (message.to && message.to.username === username) {
    privateMessageClass = "inward-message";
  } else if (message.to && message.to.username !== username) {
    privateMessageClass = "outward-message";
  }
  return (
    <div className="messageContainer">
      <img src="https://i.pravatar.cc/20" className="ava" />
      <div className={`messageMain ${privateMessageClass}`}>
        <p className="message-header">
          <b>{message.from.username}:</b>{" "}
          {message.to && (
            <i className="privateInfo">
              (Private message to: {message.to.username})
            </i>
          )}
        </p>
        <span className="messageText">
          <span className="message-arrow">{"> "}</span>
          {message.message}
        </span>{" "}
      </div>
      <i className="messageDate">({formatDate(message.created_at)})</i>
    </div>
  );
}
