import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import bosqueIntro from "../../../assets/images/bosqueIntro.jpg";
import puestaSolIntro from "../../../assets/images/puestaSolIntro.jpg";
import menhiresIntro from "../../../assets/images/menhiresIntro.jpg";
import retratoIntro from "../../../assets/images/retratoIntro.jpg";
import firmaBlanca from "../../../assets/images/firmaBlanca.png";
import { useLanguage } from "../../../i18n";

const splashImages = [bosqueIntro, puestaSolIntro, menhiresIntro, retratoIntro];

export const StartLoader: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [imageReady, setImageReady] = useState<boolean>(false);
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

  // Preload selected splash photo and signature before starting the intro animation.
  // If loading fails, skip straight to the website.
  useEffect(() => {
    let cancelled = false;

    const preloadAsset = (src: string, failOnError: boolean): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          if (typeof img.decode === "function") {
            img.decode().then(() => resolve()).catch(() => resolve());
          } else {
            resolve();
          }
        };
        img.onerror = () => {
          if (failOnError) {
            reject(new Error("Splash image failed to load"));
          } else {
            resolve();
          }
        };
        img.src = src;
      });
    };

    Promise.all([preloadAsset(bgImage, true), preloadAsset(firmaBlanca, false)])
      .then(() => {
        if (!cancelled) {
          setImageReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          handleDismiss();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [bgImage, handleDismiss]);

  // Start the 5.4s fallback safety timer ONLY after the image is ready and the animation begins
  useEffect(() => {
    if (!visible || !imageReady) return;

    const timer = window.setTimeout(() => {
      handleDismiss();
    }, 5400);

    return () => window.clearTimeout(timer);
  }, [visible, imageReady, handleDismiss]);

  if (!visible) return null;

  return (
    <Box
      onPointerDown={handleDismiss}
      onClick={handleDismiss}
      onAnimationEnd={(e) => {
        if (imageReady && e.target === e.currentTarget) {
          handleDismiss();
        }
      }}
      className={imageReady ? "fade-out-start" : undefined}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: (theme) => theme.zIndex.modal + 500,
        backgroundColor: "#000000",
        backgroundImage: imageReady ? `url(${bgImage})` : "none",
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
          backgroundColor: imageReady ? "rgba(0, 0, 0, 0.35)" : "transparent",
          pointerEvents: "none",
        },
      }}
    >
      {!imageReady ? (
        <CircularProgress
          size={36}
          thickness={2.8}
          sx={{
            color: "rgba(255, 255, 255, 0.65)",
            pointerEvents: "none",
          }}
        />
      ) : (
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
      )}
    </Box>
  );
};
