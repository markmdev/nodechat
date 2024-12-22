import { useContext } from "react";
import "./Message.styles.css";
import { AuthContext } from "../AuthContext";
import { useState } from "react";
import UserPopover from "./UserPopover";

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

export default function Message({ message, setSendingPrivateTo }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const id = anchorEl ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <b
            className="message-from"
            aria-describedby={id}
            onClick={handleClick}
          >
            {message.from.username}:
          </b>{" "}
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
      <UserPopover
        anchorEl={anchorEl}
        id={id}
        handleClose={handleClose}
        setSendingPrivateTo={() =>
          setSendingPrivateTo({
            userId: message.user_id,
            username: message.from.username,
          })
        }
      />
    </div>
  );
}
