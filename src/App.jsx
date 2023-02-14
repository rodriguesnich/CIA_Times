import { Box, Button, TextField, ToggleButton } from "@mui/material";
import NavBar from "./Components/NavBar";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import MatchDialogHelper from "./Components/Match/helper";
import MatchDialog from "./Components/Match";

function App() {
  const [entries, setEntries] = useState(
    JSON.parse(localStorage.getItem("entries")) || []
  );

  // useEffect(() => {
  //   const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
  //   console.log(storedEntries); // log the retrieved entries
  //   setEntries(storedEntries);
  // }, []);

  // Update local storage with the latest entries when the state changes
  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  // Handle the toggle button press and add the value of the TextField to the state
  const handlePress = () => {
    const input = document.querySelector('input[name="entry"]');
    setEntries([...entries, input.value]);
    input.value = "";
  };

  // Handle the close icon press and remove the corresponding entry from the state
  const handleRemove = (index) => {
    setEntries(entries.filter((entry, i) => i !== index));
  };

  return (
    <Box>
      <NavBar />
      <MatchDialog></MatchDialog>
      {entries.map((entry, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
            px: 2,
          }}
        >
          <TextField
            variant="outlined"
            value={entry}
            fullWidth
            disabled
            size="small"
          />
          <ToggleButton
            value="check"
            selected
            onClick={() => handleRemove(index)}
            sx={{ ml: 1 }}
            size="small"
          >
            <CloseIcon />
          </ToggleButton>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 2,
          px: 2,
        }}
      >
        <TextField
          label="Jogador..."
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{ name: "entry" }}
        />
        <ToggleButton
          value="check"
          selected
          onClick={handlePress}
          sx={{ ml: 1 }}
          size="small"
        >
          <AddIcon />
        </ToggleButton>
      </Box>
      <Box
        sx={{
          pt:3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={MatchDialogHelper.Open}>Sortear</Button>
      </Box>
    </Box>
  );
}

export default App;
