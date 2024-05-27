import { Typography, Button, Box, Grid, Hidden } from "@mui/material";
import AuthModal from "./AuthModal";
import { useState } from "react";

const Home = () => {
  const [isAuth, setisAuth] = useState(false);

  const closeAuth = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setisAuth(false);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          background: "#0077b6",
          height: "100vh",
          color: "white",
        }}
      >
        {isAuth && <AuthModal closeAuth={closeAuth} />}
        <Box
          display="flex"
          alignContent="center"
          justifyContent="space-between"
          mx={2}
          pt={1}
        >
          <Typography variant="h4">Minly</Typography>
          <Button color="inherit" onClick={() => setisAuth(true)}>
            Login / Signup
          </Button>
        </Box>
        <Box flexGrow={1} display="flex" alignItems="center">
          <Grid container mx={2}>
            <Grid item sm={6}>
              <Box m={2} pt={2}>
                <Typography variant="h3">Welcome to Minly</Typography>
                <Typography ml={1} variant="h6">
                  {" "}
                  Shorten. Simplify. Share.
                </Typography>
                <Button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  color="warning"
                  onClick={() => setisAuth(true)}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Hidden only="xs">
              <Grid item sm={6}>
                <img
                  alt="img"
                  style={{ width: "100%" }}
                  src="/assets/screenshot.png"
                ></img>
              </Grid>
            </Hidden>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default Home;
