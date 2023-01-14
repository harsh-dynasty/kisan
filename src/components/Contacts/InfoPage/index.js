import { SettingsPowerRounded } from "@mui/icons-material";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Avatar,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ComposeMessageModal } from "../ComposeMessageModal";

export const InfoPage = () => {
  const [searchParams] = useSearchParams();
  const [fName, lName] = searchParams.get("name").split(" ");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Contact Information
          </Typography>
          <Paper elevation={2}>
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                }}
              >
                {fName[0] + lName[0]}
              </Avatar>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {searchParams.get("name")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +{searchParams.get("number")}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Send Message
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
      <ComposeMessageModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
