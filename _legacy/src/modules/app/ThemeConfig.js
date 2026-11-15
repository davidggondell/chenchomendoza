import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    divider: "rgba(0, 0, 0, 0)",
  },
  typography: {
    fontFamily: "Montserrat",
  },
  components: {
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
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: 0,
          },
        },
      },
    },
  },
});

export default theme;
