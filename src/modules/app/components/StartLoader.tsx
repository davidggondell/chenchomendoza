import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import bosqueIntro from "../../../assets/images/bosqueIntro.jpg";
import puestaSolIntro from "../../../assets/images/puestaSolIntro.jpg";
import menhiresIntro from "../../../assets/images/menhiresIntro.jpg";
import retratoIntro from "../../../assets/images/retratoIntro.jpg";
import firmaBlanca from "../../../assets/images/firmaBlanca.png";
import { useLanguage } from "../../../i18n";

const splashImages = [bosqueIntro, puestaSolIntro, menhiresIntro, retratoIntro];

export const StartLoader: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [bgImage] = useState<string>(() => {
    const rand = Math.floor(Math.random() * splashImages.length);
    return splashImages[rand];
  });

  const { t } = useLanguage();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDismiss = useCallback(() => {
    document.documentElement.classList.remove("start-loader-active");
    setVisible(false);
  }, []);

  useEffect(() => {
    const docEl = document.documentElement;
    if (visible) {
      docEl.classList.add("start-loader-active");
    } else {
      docEl.classList.remove("start-loader-active");
    }
    return () => {
      docEl.classList.remove("start-loader-active");
    };
  }, [visible]);

  useEffect(() => {
    // Preload next splash images into browser memory
    splashImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const firmaImg = new Image();
    firmaImg.src = firmaBlanca;

    // Fallback safety timer in case CSS animation end event is skipped
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 5400);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Box
      onPointerDown={handleDismiss}
      onClick={handleDismiss}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) {
          handleDismiss();
        }
      }}
      className="fade-out-start"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: (theme) => theme.zIndex.modal + 500,
        backgroundColor: "#000000",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        "&::before": {
          content: "\"\"",
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          pointerEvents: "none",
        }}
      >
        <Typography
          className="zoom-in-text-start"
          sx={{
            fontFamily: "Bebas Neue",
            fontSize: isSm ? 54 : 80,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: isSm ? 3 : 6,
            textShadow: "0 4px 24px rgba(0, 0, 0, 0.85)",
            pointerEvents: "none",
          }}
        >
          {t("project.startLoader.title")}
        </Typography>

        <Box
          component="img"
          src={firmaBlanca}
          alt="Firma Chencho Mendoza"
          draggable={false}
          className="zoom-in-text-start"
          sx={{
            maxWidth: isSm ? "280px" : "420px",
            width: "85%",
            height: "auto",
            filter: "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.85))",
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
};
