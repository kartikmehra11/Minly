import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
      setError("");
    } catch (error) {
      setMessage("");
      setError("Failed to send password reset email. Please try again.");
    }
  };

  const handleclick = () => {
    navigate("/");
  };

  return (
    <Modal
      open={true}
      aria-labelledby="forgot-password-modal-title"
      aria-describedby="forgot-password-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography
            id="forgot-password-modal-title"
            variant="h6"
            component="h2"
          >
            Reset Password
          </Typography>
          <IconButton size="small" onClick={handleclick}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleResetPassword}
        >
          Send Reset Email
        </Button>
        {message && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
        {error && (
          <Typography color="error.main" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ForgotPassword;
