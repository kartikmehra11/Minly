// theme.js
import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#415a77",
    },
    secondary: {
      main: "#7a7a7a",
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

export { lightTheme, darkTheme };
