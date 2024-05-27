import { createTheme } from "@mui/material";
export default createTheme({
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#42a5f5",
    },
  },

  typography: {
    fontFamily: "Montserrat",
    h4: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "capitalize",
    },
  },
});
