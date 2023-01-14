import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
} from "@mui/material";
import contacts from "../../../contacts.json";
import React, { useContext, useState } from "react";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { MessagesContext } from "../../../App";

export const MessagesList = () => {
  const { messages } = useContext(MessagesContext);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Messages
        </Typography>
        {messages.length > 0 ? (
          <Paper elevation={2}>
            <List>
              {messages
                .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
                .map((message, index) => {
                  const [fName, lName] = message.name.split(" ");
                  return (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor:
                              index % 2 == 0
                                ? deepOrange[500]
                                : deepPurple[500],
                          }}
                        >
                          {fName[0] + lName[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={message.name}
                        secondary={
                          message.text.length < 30
                            ? message.text
                            : message.text.slice(0, 30) + "..."
                        }
                      />
                      <Typography variant="p" color="grey">
                        {new Date(message.timeStamp).toDateString()}{" "}
                        {new Date(message.timeStamp).toLocaleTimeString()}
                      </Typography>
                    </ListItem>
                  );
                })}
            </List>
          </Paper>
        ) : (
          "No Messages "
        )}
      </Grid>
    </Grid>
  );
};
