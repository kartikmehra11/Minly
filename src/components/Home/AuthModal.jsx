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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Firebase";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const AuthModal = ({ closeAuth }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSign, setisSign] = useState(true);
  const [errors, seterrors] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    seterrors();
    setForm((oldForm) => ({
      ...oldForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuth = async () => {
    setloading(true);
    if (isSign) {
      try {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } catch (error) {
        setloading(false);
        seterrors(error.message);
      }
    } else
      try {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      } catch (error) {
        setloading(false);
        seterrors(error.message);
      }
  };

  return (
    <Dialog open fullWidth onClose={closeAuth}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">
            {" "}
            {isSign ? "Sign In" : "Sign Up"}
          </Typography>
          <IconButton size="small" onClick={closeAuth}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          variant="filled"
          fullWidth
          label="Email"
          value={form.email}
          name="email"
          onChange={handleChange}
          type="email"
        />

        <TextField
          variant="filled"
          fullWidth
          label="Password"
          value={form.password}
          name="password"
          onChange={handleChange}
          type="password"
        />
        <Box>
          <Typography color="red">{errors}</Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          mx={2}
        >
          <Typography
            onClick={() => {
              seterrors();
              setisSign(!isSign);
            }}
          >
            {isSign
              ? "Don't have a account? Click here"
              : "Already have an account. Click here"}
          </Typography>
          <Button
            variant="contained"
            disableElevation
            onClick={handleAuth}
            sx={{ textWrap: "nowrap" }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={20} />
            ) : isSign ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default AuthModal;
