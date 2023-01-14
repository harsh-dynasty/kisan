import "./App.css";
import React, { createContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Container, Grid } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ContactsList } from "./components/Contacts/ContactsList";
import { MessagesList } from "./components/Messages/MessagesList";
import { InfoPage } from "./components/Contacts/InfoPage";

export const MessagesContext = createContext();

function App() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Kisan Network SMS-OTP
              </Typography>
              <Button color="inherit" onClick={() => navigate("/")}>
                Contacts
              </Button>

              <Button color="inherit" onClick={() => navigate("/messages")}>
                Messages
              </Button>
            </Toolbar>{" "}
          </AppBar>
        </Box>
        <Container>
          <Routes>
            <Route element={<ContactsList />} exact path="/" />
            <Route element={<InfoPage />} exact path="/contact" />

            <Route element={<MessagesList />} exact path="/messages" />
          </Routes>
        </Container>
      </div>
    </MessagesContext.Provider>
  );
}

export default App;
