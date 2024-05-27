import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { auth } from "../../Firebase";

const Navbar = () => {
  const handleSignout = () => {
    auth.signOut();
  };
  const userName = auth.currentUser.email.split("@")[0];
  return (
    <AppBar color="primary" position="fixed" display="flex">
      <Toolbar>
        <Typography variant="h4"> Minly </Typography>

        <Box ml="auto">
          <Button color="inherit">Hi {userName}</Button>
          <Button color="inherit" onClick={handleSignout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
