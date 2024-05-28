import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
      alignItems="center"
    >
      <Typography variant="h1" component="div" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
