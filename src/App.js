import "./App.css";
import React, { createContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {
  Container,
  Drawer,
  Grid,
  IconButton,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ContactsList } from "./components/Contacts/ContactsList";
import { MessagesList } from "./components/Messages/MessagesList";
import { InfoPage } from "./components/Contacts/InfoPage";
import { Menu, SettingsPowerRounded } from "@mui/icons-material";

export const MessagesContext = createContext();

function App() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      name: "Harsh Soni",
      number: "+9663473647364",
      text: "sample text for message",
      timeStamp: Date.now(),
    },
  ]);
  const handleDrawerToggle = () => {
    setOpen(true);
  };
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Kisan Network SMS-OTP
              </Typography>
              <Button
                sx={{ display: { xs: "none", sm: "block" } }}
                color="inherit"
                onClick={() => navigate("/")}
              >
                Contacts
              </Button>

              <Button
                sx={{ display: { xs: "none", sm: "block" } }}
                color="inherit"
                onClick={() => navigate("/messages")}
              >
                Messages
              </Button>
            </Toolbar>{" "}
          </AppBar>
        </Box>
        <Container sx={{ alignText: "center" }}>
          <Routes>
            <Route element={<ContactsList />} exact path="/" />
            <Route element={<InfoPage />} exact path="/contact" />

            <Route element={<MessagesList />} exact path="/messages" />
          </Routes>
        </Container>
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/");
                    setOpen(false);
                  }}
                >
                  <ListItemText primary={"Contacts"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/messages");
                    setOpen(false);
                  }}
                >
                  <ListItemText primary={"Messages"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </div>
    </MessagesContext.Provider>
  );
}

export default App;
