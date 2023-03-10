import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
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
  width: "50%",
  maxWidth: 400,
  minWidth: 200,
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
  const [err, setError] = useState("");
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
      }).then((res) => {
        if (res.status !== 200) {
          setError("There's some error in sending message");
          handleClose();
          setSuccess(false);
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 2000);
          return;
        }
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
      });
    }
  };

  return (
    <>
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
            placeholder="Type message here"
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
              disabled={loading || !input}
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
          <IconButton
            sx={{
              width: "fit-content",
              position: "absolute",
              top: 10,
              right: 10,
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Box>
      </Modal>
      <Snackbar open={err ? true : false} autoHideDuration={200}>
        <Alert severity="error">{err}</Alert>
      </Snackbar>
    </>
  );
};
