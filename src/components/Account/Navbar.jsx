import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { auth } from "../../Firebase";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

const Navbar = () => {
  const theme = useTheme();
  const handleSignout = () => {
    auth.signOut();
  };

  const { toggleTheme } = useContext(ThemeContext);

  const userName = auth.currentUser.email.split("@")[0];
  return (
    <AppBar color="primary" position="static" display="flex">
      <Toolbar>
        <Typography variant="h4"> Minly </Typography>

        <Box ml="auto">
          <Button color="inherit">Hi {userName}</Button>
          <Button color="inherit" onClick={handleSignout}>
            Logout
          </Button>
          <Button color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
