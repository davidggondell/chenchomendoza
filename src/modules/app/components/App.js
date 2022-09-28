import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Aos from "aos";
import "aos/dist/aos.css";
import "../app.css";
import theme from "../ThemeConfig";
import Body from "./Body";
import { ThemeProvider } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StartLoader from "./StartLoader";
import ScrollToTop from "../../hooks/ScrollToTop";
import firma from "../../../images/firmaBlanca.png";
import bosqueIntro from "../../../images/bosqueIntro.jpg";

const App = () => {
  const useAppbar = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpened, setSidebarOpened] = React.useState(false);
  const sidebarWidth = useAppbar ? 240 : 320;
  const appbarHeight = 50;
  const widthOffset = !useAppbar ? sidebarWidth : 0;
  const heightOffset = useAppbar ? appbarHeight : 0;

  useEffect(() => {
    Aos.init({ duration: 750 });
    const imagesPreload = [firma, bosqueIntro];
    imagesPreload.forEach((image) => {
      new Image().src = image;
    });
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <StartLoader />
            {useAppbar && (
              <Header
                sideBarWidth={sidebarWidth}
                appbarHeight={appbarHeight}
                toogleSidebar={() => setSidebarOpened(!sidebarOpened)}
              />
            )}
            <Sidebar
              open={sidebarOpened}
              toogle={() => setSidebarOpened(!sidebarOpened)}
              variant={useAppbar ? "temporary" : "permanent"}
              sidebarWidth={sidebarWidth}
            />
            <Box
              sx={{
                paddingLeft: widthOffset + "px",
                paddingTop: heightOffset + "px",
              }}
            >
              <Body />
            </Box>
          </CssBaseline>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  );
};

export default App;
