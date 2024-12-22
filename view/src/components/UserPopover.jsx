import { Button, Popover } from "@mui/material";
import { useEffect } from "react";

export default function UserPopover({
  anchorEl,
  id,
  handleClose,
  setSendingPrivateTo,
}) {
  const open = Boolean(anchorEl);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Button
        onClick={() => {
          setSendingPrivateTo();
          handleClose();
        }}
      >
        Send private message
      </Button>
    </Popover>
  );
}
