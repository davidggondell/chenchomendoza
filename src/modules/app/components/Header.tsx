import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/images/LOGOPAGINABLANCA.png";
import { useLanguage } from "../../../i18n";

interface HeaderProps {
  appbarHeight?: number;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appbarHeight = 56,
  onToggleSidebar,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff",
        color: "#111111",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ height: `${appbarHeight}px`, minHeight: `${appbarHeight}px`, padding: "0 1rem" }}>
        <Box
          component="img"
          src={logo}
          alt="Chencho Mendoza"
          onClick={() => navigate("/")}
          sx={{
            height: "36px",
            width: "auto",
            cursor: "pointer",
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Button
          onClick={onToggleSidebar}
          sx={{
            color: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "4px 10px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              color: "#000000",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Bebas Neue",
              fontSize: "1.25rem",
              letterSpacing: "1px",
              lineHeight: 1,
              pt: "2px",
            }}
          >
            {t("project.header.menu")}
          </Typography>
          <MenuIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
