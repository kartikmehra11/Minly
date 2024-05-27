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
  const handleChange = (e) => {
    setForm((oldform) => ({
      ...oldform,
      [e.target.name]: e.target.value,
    }));
  };
  const handleGenerate = () => {
    setLoading(true);
    handleShortURL(form.name, form.longURL);
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
