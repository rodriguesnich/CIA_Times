import { forwardRef, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MatchDialogHelper from "./helper";
import { AppBar, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MatchDialog() {
  const [open, setOpen] = useState(false);

  const [entries, setEntries] = useState(
    JSON.parse(localStorage.getItem("entries")) || []
  );

  useEffect(() => {
    MatchDialogHelper.Observer.Subscrible(handleClickOpen);
  }, []);

  // Shuffle the entries array randomly
  const shuffledEntries = entries.sort(() => Math.random() - 0.5);

  // Split the shuffled entries into two teams
  const team1 = shuffledEntries.slice(0, shuffledEntries.length / 2);
  const team2 = shuffledEntries.slice(shuffledEntries.length / 2);

  // Function to generate the share message
  const generateMessage = () => {
    const team1String = team1.join(", ");
    const team2String = team2.join(", ");
    return `Team 1: ${team1String}\n\nTeam 2: ${team2String}`;
  };

  // Function to handle the share button click
  const handleShareButtonClick = () => {
    const message = generateMessage();
    const shareUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.open(shareUrl, "_blank");
  };

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Times:
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "yellow",
          color: "white",
          p: 2,
          display: "flex",
          justifyContent: "center",
          color: "black",
        }}
      >
        <Typography variant="h5">Time 1</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {team1.map((entry, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">{entry}</Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          bgcolor: "blue",
          color: "white",
          p: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">Time 2</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {team2.map((entry, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">{entry}</Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleShareButtonClick}>Share</Button>
      </Box>
    </Dialog>
  );
}
