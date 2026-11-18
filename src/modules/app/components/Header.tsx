import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../../assets/images/LOGOPAGINABLANCA.png";
import { useLanguage } from "../../../i18n";

interface HeaderProps {
  appbarHeight?: number;
  open?: boolean;
  onToggleSidebar: () => void;
  onCloseSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appbarHeight = 56,
  open = false,
  onToggleSidebar,
  onCloseSidebar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      if (open && onCloseSidebar) {
        onCloseSidebar();
      }
      return;
    }
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff",
        color: "#111111",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <Toolbar
        sx={{
          height: `${appbarHeight}px`,
          minHeight: `${appbarHeight}px !important`,
          padding: "0 1rem",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Chencho Mendoza"
          onClick={handleLogoClick}
          sx={{
            height: "36px",
            width: "auto",
            cursor: "pointer",
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Button
          onClick={onToggleSidebar}
          aria-label={open ? t("project.common.close") : t("project.header.menu")}
          sx={{
            color: open ? "#000000" : "rgba(0, 0, 0, 0.75)",
            display: "flex",
            alignItems: "center",
            gap: 0.85,
            minHeight: "42px",
            padding: "6px 12px",
            borderRadius: "8px",
            backgroundColor: open ? "rgba(0, 0, 0, 0.05)" : "transparent",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.06)",
              color: "#000000",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Bebas Neue",
              fontSize: "1.25rem",
              letterSpacing: "1.5px",
              lineHeight: 1,
              pt: "2px",
            }}
          >
            {open ? t("project.common.close") : t("project.header.menu")}
          </Typography>
          {open ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
