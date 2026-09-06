import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Collapse,
  Divider,
  IconButton,
  Icon,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../../assets/images/LOGOPAGINABLANCA.png";
import flickrIcon from "../../../assets/images/flickrIcon.png";
import pxIcon from "../../../assets/images/500pxIcon.png";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../../../i18n";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: "permanent" | "temporary";
  sidebarWidth?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant, sidebarWidth = 260 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const galleryPaths = ["/paisaje", "/naturaleza", "/retrato", "/deportes", "/otros"];
  const isGalleryActive = galleryPaths.includes(location.pathname);

  const [openGallery, setOpenGallery] = useState<boolean>(isGalleryActive);

  const handleNavigate = (path: string) => {
    navigate(path);
    if (variant === "temporary") {
      onClose();
    }
  };

  const NavItem = ({
    text,
    path,
    action,
    selected = false,
    isSubItem = false,
  }: {
    text: string;
    path?: string;
    action?: () => void;
    selected?: boolean;
    isSubItem?: boolean;
  }) => {
    const isCurrent = path ? location.pathname === path : selected;

    return (
      <ListItem
        onClick={() => {
          if (action) action();
          else if (path) handleNavigate(path);
        }}
        sx={{
          height: isSubItem ? 32 : 36,
          padding: "3px 8px",
          cursor: "pointer",
          opacity: isCurrent ? 1 : 0.4,
          backgroundColor: "transparent !important",
          transition: "opacity 0.2s ease",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent !important",
          },
        }}
      >
        <ListItemText
          primary={
            <Typography
              sx={{
                fontSize: isSubItem ? 12 : 13,
                letterSpacing: isSubItem ? 1.5 : 2,
                fontWeight: 600,
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              {text}
            </Typography>
          }
        />
      </ListItem>
    );
  };

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1.5rem 1rem 1.25rem",
          boxSizing: "border-box",
        }}
      >
        {/* 1. Top: Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "0.25rem 0.5rem",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Chencho Mendoza"
            onClick={() => handleNavigate("/")}
            sx={{
              width: "100%",
              maxWidth: "175px",
              cursor: "pointer",
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.85 },
            }}
          />
        </Box>

        {/* 2. Middle: Navigation Menu (Vertically Centered) */}
        <Box sx={{ my: "auto", py: 2 }}>
          <List component="nav" sx={{ paddingLeft: variant === "permanent" ? 3.5 : 1.5 }}>
            <NavItem text={t("project.navigation.home")} path="/" />

            <NavItem
              text={openGallery ? t("project.navigation.galleriesOpened") : t("project.navigation.galleriesClosed")}
              action={() => setOpenGallery(!openGallery)}
              selected={openGallery || isGalleryActive}
            />

            <Collapse in={openGallery} sx={{ paddingLeft: 1.5 }}>
              <Box sx={{ display: "flex", mt: "2px", mb: "4px", gap: 0.75 }}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: "rgba(0, 0, 0, 0.15)",
                    my: "2px",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <NavItem text={t("project.navigation.landscape")} path="/paisaje" isSubItem />
                  <NavItem text={t("project.navigation.nature")} path="/naturaleza" isSubItem />
                  <NavItem text={t("project.navigation.portraits")} path="/retrato" isSubItem />
                  <NavItem text={t("project.navigation.sports")} path="/deportes" isSubItem />
                  <NavItem text={t("project.navigation.others")} path="/otros" isSubItem />
                </Box>
              </Box>
            </Collapse>

            <NavItem text={t("project.navigation.aboutme")} path="/sobremi" />
            <NavItem text={t("project.navigation.contact")} path="/contacto" />
          </List>
        </Box>

        {/* 3. Bottom: Language, Social Links & Copyright */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            alignItems: "center",
            pt: 1,
          }}
        >
          <LanguageSelector />

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="medium"
              onClick={() => window.open("https://www.instagram.com/chenchomendoza/", "_blank")}
              sx={{
                color: "#444444",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#000000",
                  transform: "scale(1.15)",
                },
              }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="medium"
              href="https://www.flickr.com/photos/chenchomendoza/"
              target="_blank"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.15)" },
              }}
            >
              <Icon
                fontSize="small"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={flickrIcon} style={{ height: "75%", width: "75%", opacity: 0.6 }} alt="Flickr" />
              </Icon>
            </IconButton>

            <IconButton
              size="medium"
              href="https://500px.com/p/chenchomendoza"
              target="_blank"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.15)" },
              }}
            >
              <Icon
                fontSize="small"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={pxIcon} style={{ height: "75%", width: "75%", opacity: 0.6 }} alt="500px" />
              </Icon>
            </IconButton>
          </Box>

          <Typography
            sx={{
              fontSize: 11,
              color: "#888888",
              textAlign: "center",
            }}
          >
            &copy; {new Date().getFullYear()} David García Gondell
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
