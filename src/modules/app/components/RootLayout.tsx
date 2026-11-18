import React, { useState, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { StartLoader } from "./StartLoader";
import { ScrollToTop } from "../../common/components/ScrollToTop";
import { ScrollbarController } from "../../common/components/ScrollbarController";

export const RootLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarWidth = 260;
  const appbarHeight = 56;

  // Close mobile menu synchronously before paint ONLY once the new route is already mounted in <Outlet />
  useLayoutEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  const paddingTop = isMobile ? `${appbarHeight}px` : 0;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", position: "relative" }}>
      <ScrollToTop />
      <ScrollbarController />
      <StartLoader />

      {isMobile && (
        <Header
          appbarHeight={appbarHeight}
          open={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onCloseSidebar={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={isMobile ? "temporary" : "permanent"}
        sidebarWidth={sidebarWidth}
        appbarHeight={appbarHeight}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: !isMobile ? `calc(100% - ${sidebarWidth}px)` : "100%",
          paddingTop: paddingTop,
          minHeight: "100vh",
          overflowX: "hidden",
          backgroundColor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default RootLayout;
