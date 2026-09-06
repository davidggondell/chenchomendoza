import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { StartLoader } from "./StartLoader";
import { ScrollToTop } from "../../common/components/ScrollToTop";

export const RootLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarWidth = isMobile ? 240 : 260;
  const appbarHeight = 50;

  const paddingTop = isMobile ? `${appbarHeight}px` : 0;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", position: "relative" }}>
      <ScrollToTop />
      <StartLoader />

      {isMobile && (
        <Header
          appbarHeight={appbarHeight}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={isMobile ? "temporary" : "permanent"}
        sidebarWidth={sidebarWidth}
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
