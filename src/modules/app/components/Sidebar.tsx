import React, { useState, useEffect } from "react";
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
  ButtonBase,
  Fade,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  appbarHeight?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  variant,
  sidebarWidth = 260,
  appbarHeight = 56,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const galleryItems = [
    { text: t("project.navigation.landscape"), path: "/paisaje" },
    { text: t("project.navigation.nature"), path: "/naturaleza" },
    { text: t("project.navigation.portraits"), path: "/retrato" },
    { text: t("project.navigation.sports"), path: "/deportes" },
    { text: t("project.navigation.others"), path: "/otros" },
  ];

  const galleryPaths = galleryItems.map((item) => item.path);
  const isGalleryActive = galleryPaths.includes(location.pathname);

  const [openGallery, setOpenGallery] = useState<boolean>(
    variant === "temporary" ? true : isGalleryActive
  );

  useEffect(() => {
    if (isGalleryActive) {
      setOpenGallery(true);
    }
  }, [isGalleryActive]);

  // Lock page scroll while mobile full-screen menu is open
  useEffect(() => {
    if (variant !== "temporary") return;
    const docEl = document.documentElement;
    if (open) {
      docEl.classList.add("modal-scroll-locked");
    } else {
      docEl.classList.remove("modal-scroll-locked");
    }
    return () => {
      docEl.classList.remove("modal-scroll-locked");
    };
  }, [open, variant]);

  const handleNavigate = (path: string) => {
    if (location.pathname === path) {
      if (variant === "temporary") {
        onClose();
      }
      return;
    }
    navigate(path);
  };

  // ==================== MOBILE FULL-SCREEN OVERLAY MENU ====================
  if (variant === "temporary") {
    const MobileNavButton = ({
      text,
      path,
      action,
      active = false,
      expandable = false,
      expanded = false,
    }: {
      text: string;
      path?: string;
      action?: () => void;
      active?: boolean;
      expandable?: boolean;
      expanded?: boolean;
    }) => {
      const isCurrent = path ? location.pathname === path : active;

      return (
        <ButtonBase
          onClick={() => {
            if (action) action();
            else if (path) handleNavigate(path);
          }}
          sx={{
            width: "100%",
            minHeight: "50px",
            py: 0.75,
            px: 2,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            transition: "all 0.2s ease",
            backgroundColor: isCurrent && !expandable ? "rgba(0, 0, 0, 0.05)" : "transparent",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Bebas Neue",
              fontSize: "1.9rem",
              letterSpacing: "3px",
              lineHeight: 1.1,
              color: isCurrent ? "#000000" : "rgba(0, 0, 0, 0.45)",
              fontWeight: 400,
              transition: "color 0.2s ease",
            }}
          >
            {text}
          </Typography>
          {expandable && (
            <ExpandMoreIcon
              sx={{
                fontSize: "1.4rem",
                color: isCurrent ? "#000000" : "rgba(0, 0, 0, 0.45)",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease, color 0.2s ease",
              }}
            />
          )}
        </ButtonBase>
      );
    };

    return (
      <Fade in={open} timeout={220} unmountOnExit>
        <Box
          role="dialog"
          aria-modal="true"
          sx={{
            position: "fixed",
            top: `${appbarHeight}px`,
            left: 0,
            right: 0,
            bottom: 0,
            height: `calc(100dvh - ${appbarHeight}px)`,
            width: "100vw",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem 1.5rem",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          {/* Main Navigation Links (Thumb-friendly centered layout, no duplicated logo) */}
          <Box
            component="nav"
            sx={{
              my: "auto",
              width: "100%",
              maxWidth: "360px",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <MobileNavButton text={t("project.navigation.home")} path="/" />

            <MobileNavButton
              text={t("project.navigation.galleries")}
              action={() => setOpenGallery((prev) => !prev)}
              active={openGallery || isGalleryActive}
              expandable
              expanded={openGallery}
            />

            <Collapse in={openGallery} sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 1,
                  py: 1,
                  px: 0.5,
                }}
              >
                {galleryItems.map((item, idx) => {
                  const isSubCurrent = location.pathname === item.path;
                  const isLastOdd =
                    galleryItems.length % 2 === 1 && idx === galleryItems.length - 1;

                  return (
                    <ButtonBase
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      sx={{
                        gridColumn: isLastOdd ? "1 / -1" : "auto",
                        minHeight: "42px",
                        px: 2,
                        py: 1,
                        borderRadius: "8px",
                        border: isSubCurrent
                          ? "1px solid #111111"
                          : "1px solid rgba(0, 0, 0, 0.12)",
                        backgroundColor: isSubCurrent ? "#111111" : "rgba(0, 0, 0, 0.02)",
                        color: isSubCurrent ? "#ffffff" : "#222222",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          letterSpacing: "1.8px",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.text}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Collapse>

            <MobileNavButton text={t("project.navigation.aboutme")} path="/sobremi" />
            <MobileNavButton text={t("project.navigation.trajectory")} path="/trayectoria" />
            <MobileNavButton text={t("project.navigation.contact")} path="/contacto" />
          </Box>

          {/* Bottom Footer: Language Selector, Social Links & Copyright */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              alignItems: "center",
              pt: 2,
              borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <LanguageSelector />

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1.5 }}>
              <IconButton
                size="medium"
                onClick={() => window.open("https://www.instagram.com/chenchomendoza/", "_blank")}
                sx={{ color: "#222222" }}
              >
                <InstagramIcon fontSize="medium" />
              </IconButton>

              <IconButton
                size="medium"
                href="https://www.flickr.com/photos/chenchomendoza/"
                target="_blank"
              >
                <Icon
                  fontSize="medium"
                  sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img
                    src={flickrIcon}
                    style={{ height: "75%", width: "75%", opacity: 0.75 }}
                    alt="Flickr"
                  />
                </Icon>
              </IconButton>

              <IconButton
                size="medium"
                href="https://500px.com/p/chenchomendoza"
                target="_blank"
              >
                <Icon
                  fontSize="medium"
                  sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img
                    src={pxIcon}
                    style={{ height: "75%", width: "75%", opacity: 0.75 }}
                    alt="500px"
                  />
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
      </Fade>
    );
  }

  // ==================== DESKTOP PERMANENT LEFT SIDEBAR ====================
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
      variant="permanent"
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
          <List component="nav" sx={{ paddingLeft: 3.5 }}>
            <NavItem text={t("project.navigation.home")} path="/" />

            <NavItem
              text={
                openGallery
                  ? t("project.navigation.galleriesOpened")
                  : t("project.navigation.galleriesClosed")
              }
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
                  {galleryItems.map((item) => (
                    <NavItem key={item.path} text={item.text} path={item.path} isSubItem />
                  ))}
                </Box>
              </Box>
            </Collapse>

            <NavItem text={t("project.navigation.aboutme")} path="/sobremi" />
            <NavItem text={t("project.navigation.trajectory")} path="/trayectoria" />
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
                <img
                  src={flickrIcon}
                  style={{ height: "75%", width: "75%", opacity: 0.6 }}
                  alt="Flickr"
                />
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
                <img
                  src={pxIcon}
                  style={{ height: "75%", width: "75%", opacity: 0.6 }}
                  alt="500px"
                />
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
