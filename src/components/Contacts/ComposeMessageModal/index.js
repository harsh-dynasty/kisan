import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MessagesContext } from "../../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  gap: 5,
  boxShadow: 24,
  p: 4,
};

export const ComposeMessageModal = ({ open, handleClose }) => {
  const [input, setInput] = useState("");
  const [searchParams] = useSearchParams();
  const { setMessages } = useContext(MessagesContext);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    setInput(`Hi, Your OTP is ${Math.floor(Math.random() * 999999)}`);
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      const name = searchParams.get("name");
      var number = "+" + searchParams.get("number");
      number = number.split(" ").join("");
      fetch("https://twilio-dzd2.onrender.com/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: number, text: input }),
      })
        .then((res) => {
          console.log(res);
          setSuccess(true);
          setLoading(false);

          setMessages((prev) => {
            const newMessages = Array.from(prev);
            newMessages.push({
              name,
              number,
              timeStamp: Date.now(),
              text: input,
            });
            return newMessages;
          });

          setTimeout(() => {
            handleClose();
            setSuccess(false);
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Compose Message
        </Typography>
        <TextField
          autoFocus
          multiline
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Box
          sx={{
            m: 1,
            position: "relative",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={loading}
            onClick={handleButtonClick}
          >
            {success ? "Sent" : "Send Message"}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
