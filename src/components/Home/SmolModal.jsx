import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
const SmolModal = ({ handleclose, handleShortURL }) => {
  const [Loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    longURL: "",
  });

  const [errors, seterrors] = useState("");

  const handleChange = (e) => {
    seterrors("");
    setForm((oldform) => ({
      ...oldform,
      [e.target.name]: e.target.value,
    }));
  };
  const handleGenerate = () => {
    let isError = true;
    setLoading(true);
    const expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if (form.name.trim().length < 3 || form.name.trim().length > 20) {
      seterrors("The name should be minimum 3 char and max 20 chars long");
      isError = false;
      setLoading(false);
    }
    if (!regex.test(form.longURL)) {
      seterrors("URL is not valid");
      isError = false;
      setLoading(false);
    }
    if (isError) {
      setTimeout(() => {
        handleShortURL(form.name, form.longURL);
      }, 1000);
    }
  };

  return (
    <Dialog open={true} onClose={handleclose} fullWidth={true}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5"> Create New URL</Typography>
          <IconButton size="small" onClick={handleclose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box mb={3}>
          <TextField
            variant="filled"
            label="Name"
            fullWidth
            name="name"
            value={form.name}
            onChange={handleChange}
          >
            Name
          </TextField>
        </Box>
        <TextField
          variant="filled"
          label="Long URL"
          fullWidth
          name="longURL"
          value={form.longURL}
          onChange={handleChange}
        >
          Long URL
        </TextField>
        <Box>
          <Typography color="red">{errors}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box mr={2}>
          <Button variant="contained" disableElevation onClick={handleGenerate}>
            {Loading ? (
              <CircularProgress sx={{ color: "white" }} size={20} />
            ) : (
              "Generate"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default SmolModal;
