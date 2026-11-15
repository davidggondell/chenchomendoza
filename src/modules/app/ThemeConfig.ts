import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a1a1a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    divider: "rgba(0, 0, 0, 0.08)",
    text: {
      primary: "#222222",
      secondary: "#6c757d",
    },
  },
  typography: {
    fontFamily: "\"Montserrat\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif",
    h1: {
      fontFamily: "\"Bebas Neue\", Impact, sans-serif",
      letterSpacing: "2px",
    },
    h2: {
      fontFamily: "\"Bebas Neue\", Impact, sans-serif",
      letterSpacing: "2px",
    },
    h3: {
      fontFamily: "\"Bebas Neue\", Impact, sans-serif",
      letterSpacing: "1.5px",
    },
    h4: {
      fontFamily: "\"Bebas Neue\", Impact, sans-serif",
      letterSpacing: "1.5px",
    },
    h5: {
      fontFamily: "\"Bebas Neue\", Impact, sans-serif",
      letterSpacing: "1px",
    },
    h6: {
      fontFamily: "\"Bebas Neue\", Impact, sans-serif",
      letterSpacing: "1px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          "&:focus": {
            outline: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: 0,
            border: 0,
          },
        },
      },
    },
  },
});

export default theme;
