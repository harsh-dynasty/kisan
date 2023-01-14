import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  Button,
  ListItemButton,
} from "@mui/material";
import contacts from "../../../contacts.json";
import React, { useState } from "react";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export const ContactsList = () => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Contacts List
        </Typography>
        <Paper elevation={2}>
          <List>
            {contacts.map((contact, index) => {
              const [fName, lName] = contact.name.split(" ");
              return (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() =>
                      navigate(
                        `/contact?name=${contact.name}&number=${contact.number}`
                      )
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            index % 2 == 0 ? deepOrange[500] : deepPurple[500],
                        }}
                      >
                        {fName[0] + lName[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={contact.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};
