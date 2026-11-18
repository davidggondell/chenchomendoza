import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  ButtonGroup,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useInterval } from "../../common/hooks/useInterval";
import { useSwipe } from "../../common/hooks/useSwipe";
import { ensureImageUrl } from "../services/galleryService";
import type { ImageItem } from "../../../types";

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(32px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-32px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const fadeZoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-32px) scale(0.985);
  }
`;

const slideOutToRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(32px) scale(0.985);
  }
`;

interface ImageLightboxProps {
  images: ImageItem[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex,
  open,
  onClose,
}) => {
  const [dialogImageNum, setDialogImageNum] = useState<number>(initialIndex);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev" | "none">("none");
  const [outgoingImage, setOutgoingImage] = useState<{
    key: number;
    src: string;
    name: string;
    direction: "next" | "prev";
  } | null>(null);
  const [pause, setPause] = useState<boolean>(true); // default paused unless user plays
  const [, setUrlResolvedTick] = useState<number>(0);
  const [overlayControlsVisible, setOverlayControlsVisible] = useState<boolean>(true);
  const hideOverlayTimerRef = useRef<number | null>(null);
  const outgoingTimerRef = useRef<number | null>(null);
  const overlayVisibleRef = useRef<boolean>(true);
  const prevRippleRef = useRef<HTMLSpanElement | null>(null);
  const nextRippleRef = useRef<HTMLSpanElement | null>(null);
  const buttonTouchStartXRef = useRef<number | null>(null);
  const lastButtonTouchTimeRef = useRef<number>(0);
  const dialogImageNumRef = useRef<number>(initialIndex);
  dialogImageNumRef.current = dialogImageNum;
  overlayVisibleRef.current = overlayControlsVisible;

  const triggerRipple = (el: HTMLSpanElement | null) => {
    if (!el || typeof el.animate !== "function") return;
    el.getAnimations().forEach((anim) => anim.cancel());
    el.animate(
      [
        { opacity: 0.55, transform: "scale(0.2)" },
        { opacity: 0, transform: "scale(1.15)" },
      ],
      {
        duration: 400,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "none",
      }
    );
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isCompactHeight = useMediaQuery("(max-height: 520px)");
  const isOverlayArrows = isSmallScreen || isCompactHeight;

  const clearOverlayTimer = useCallback(() => {
    if (hideOverlayTimerRef.current !== null) {
      window.clearTimeout(hideOverlayTimerRef.current);
      hideOverlayTimerRef.current = null;
    }
  }, []);

  const revealOverlayControls = useCallback(() => {
    if (!overlayVisibleRef.current) {
      overlayVisibleRef.current = true;
      setOverlayControlsVisible(true);
    }
    clearOverlayTimer();
    if (open && isOverlayArrows) {
      hideOverlayTimerRef.current = window.setTimeout(() => {
        overlayVisibleRef.current = false;
        setOverlayControlsVisible(false);
      }, 2500);
    }
  }, [open, isOverlayArrows, clearOverlayTimer]);

  useEffect(() => {
    setDialogImageNum(initialIndex);
    setTransitionDirection("none");
    setOutgoingImage(null);
    if (outgoingTimerRef.current !== null) {
      window.clearTimeout(outgoingTimerRef.current);
      outgoingTimerRef.current = null;
    }
  }, [initialIndex, open]);

  useEffect(() => {
    return () => {
      if (outgoingTimerRef.current !== null) {
        window.clearTimeout(outgoingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (open && isOverlayArrows) {
      revealOverlayControls();
    } else {
      clearOverlayTimer();
      setOverlayControlsVisible(true);
    }
    return clearOverlayTimer;
  }, [open, isOverlayArrows, revealOverlayControls, clearOverlayTimer]);

  // Ensure current, next, and previous image URLs are resolved when Lightbox is open
  useEffect(() => {
    if (!open || images.length === 0) return;
    let active = true;

    const currentItem = images[dialogImageNum] || images[0];
    const nextItem = images[(dialogImageNum + 1) % images.length];
    const prevItem = images[(dialogImageNum - 1 + images.length) % images.length];

    if (currentItem && !currentItem.src) {
      ensureImageUrl(currentItem)
        .then(() => {
          if (active) setUrlResolvedTick((n) => n + 1);
        })
        .catch(() => {});
    }
    if (nextItem && !nextItem.src) {
      void ensureImageUrl(nextItem).catch(() => {});
    }
    if (prevItem && !prevItem.src) {
      void ensureImageUrl(prevItem).catch(() => {});
    }

    return () => {
      active = false;
    };
  }, [open, dialogImageNum, images]);

  // Lock root html scroll & hide scrollbar while lightbox is open
  useEffect(() => {
    const docEl = document.documentElement;
    if (open) {
      docEl.classList.add("modal-scroll-locked");
    } else {
      docEl.classList.remove("modal-scroll-locked");
    }
    return () => {
      docEl.classList.remove("modal-scroll-locked");
    };
  }, [open]);

  const transitionToImage = useCallback(
    (direction: "next" | "prev") => {
      if (images.length <= 1) return;
      const currentIdx = dialogImageNumRef.current;
      const currentImg = images[currentIdx];
      if (currentImg) {
        setOutgoingImage({
          key: currentIdx,
          src: currentImg.src,
          name: currentImg.name,
          direction,
        });
        if (outgoingTimerRef.current !== null) {
          window.clearTimeout(outgoingTimerRef.current);
        }
        outgoingTimerRef.current = window.setTimeout(() => {
          setOutgoingImage(null);
          outgoingTimerRef.current = null;
        }, 320);
      }
      const nextIdx =
        direction === "next"
          ? currentIdx >= images.length - 1
            ? 0
            : currentIdx + 1
          : currentIdx <= 0
            ? images.length - 1
            : currentIdx - 1;
      dialogImageNumRef.current = nextIdx;
      setTransitionDirection(direction);
      setDialogImageNum(nextIdx);
    },
    [images]
  );

  const nextImg = useCallback(() => {
    transitionToImage("next");
  }, [transitionToImage]);

  const prevImg = useCallback(() => {
    transitionToImage("prev");
  }, [transitionToImage]);

  const handleArrowTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    buttonTouchStartXRef.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleArrowTouchEnd = (
    e: React.TouchEvent<HTMLButtonElement>,
    action: () => void,
    rippleEl: HTMLSpanElement | null
  ) => {
    e.currentTarget.blur();
    const startX = buttonTouchStartXRef.current;
    const endX = e.changedTouches[0]?.clientX ?? startX;
    buttonTouchStartXRef.current = null;

    if (startX !== null && endX !== null && Math.abs(endX - startX) > 20) {
      // User dragged across the button as part of a swipe; let parent useSwipe handle it
      return;
    }

    e.stopPropagation();
    lastButtonTouchTimeRef.current = Date.now();
    triggerRipple(rippleEl);
    revealOverlayControls();
    action();
  };

  const handleArrowClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: () => void,
    rippleEl: HTMLSpanElement | null
  ) => {
    e.currentTarget.blur();
    if (Date.now() - lastButtonTouchTimeRef.current < 450) {
      return;
    }
    triggerRipple(rippleEl);
    revealOverlayControls();
    action();
  };

  // Autoplay loop every 6s
  useInterval(
    () => {
      if (!pause && open) {
        nextImg();
      }
    },
    !pause && open ? 6000 : null
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        nextImg();
      } else if (e.key === "ArrowLeft") {
        prevImg();
      } else if (e.key === " ") {
        e.preventDefault();
        setPause((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, nextImg, prevImg]);

  // Touch gesture support
  const { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel } = useSwipe({
    onSwipeLeft: nextImg,
    onSwipeRight: prevImg,
  });

  if (!open || images.length === 0) return null;

  const dialogImage = images[dialogImageNum] || images[0];

  return (
    <Dialog
      id="carousselDialog"
      fullScreen
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#282828",
          color: "#ffffff",
          overflow: "hidden",
          overscrollBehavior: "none",
          height: "100dvh",
          maxHeight: "100dvh",
          width: "100%",
        },
      }}
    >
      <Box
        onTouchStart={(e) => {
          revealOverlayControls();
          onTouchStart(e);
        }}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        onPointerDown={revealOverlayControls}
        onMouseMove={revealOverlayControls}
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          overscrollBehavior: "none",
          touchAction: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          userSelect: "none",
        }}
      >
        {/* Close Button */}
        <Box
          sx={{
            position: "absolute",
            zIndex: 10,
            top: isCompactHeight ? 8 : { xs: 10, sm: 14 },
            right: isCompactHeight ? 8 : { xs: 10, sm: 14 },
          }}
        >
          <IconButton
            size={isCompactHeight ? "medium" : "large"}
            disableRipple
            disableFocusRipple
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={handleArrowTouchStart}
            onTouchEnd={(e) => handleArrowTouchEnd(e, onClose, null)}
            onClick={(e) => handleArrowClick(e, onClose, null)}
            sx={{
              color: "#ffffff",
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              "&:hover, &:focus, &.Mui-focusVisible, &:active": {
                backgroundColor: "rgba(0, 0, 0, 0.45)",
              },
              "@media (hover: hover) and (pointer: fine)": {
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              },
            }}
            aria-label="Cerrar visor"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>

        {/* Dialog Content */}
        <DialogContent
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isCompactHeight
              ? "4px 8px"
              : { xs: "8px 4px", sm: "16px 20px", md: "24px" },
            boxSizing: "border-box",
          }}
        >
          {/* Main Photo Stage */}
          <Box
            sx={{
              flex: "1 1 0%",
              minHeight: 0,
              minWidth: 0,
              width: "100%",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <IconButton
              size={isOverlayArrows ? "small" : "large"}
              disableRipple
              disableFocusRipple
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={handleArrowTouchStart}
              onTouchEnd={(e) => handleArrowTouchEnd(e, prevImg, prevRippleRef.current)}
              onClick={(e) => handleArrowClick(e, prevImg, prevRippleRef.current)}
              sx={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                overflow: "hidden",
                color: "#ffffff",
                backgroundColor: isOverlayArrows
                  ? "rgba(0, 0, 0, 0.38)"
                  : "rgba(255, 255, 255, 0.06)",
                zIndex: 5,
                flexShrink: 0,
                "&:hover, &:focus, &.Mui-focusVisible, &:active": {
                  backgroundColor: isOverlayArrows
                    ? "rgba(0, 0, 0, 0.38)"
                    : "rgba(255, 255, 255, 0.06)",
                },
                ...(isOverlayArrows
                  ? {
                      position: "absolute",
                      left: 6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: overlayControlsVisible ? 1 : 0,
                      transition: "opacity 0.45s ease, background-color 0.2s ease",
                    }
                  : {
                      "@media (hover: hover) and (pointer: fine)": {
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          transform: "scale(1.1)",
                        },
                      },
                    }),
              }}
              aria-label="Foto anterior"
            >
              <Box
                ref={prevRippleRef}
                component="span"
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.35)",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              <KeyboardArrowLeftIcon
                fontSize={isOverlayArrows ? "medium" : "large"}
              />
            </IconButton>

            <Box
              onContextMenu={(e) => e.preventDefault()}
              sx={{
                flex: "1 1 0%",
                minHeight: 0,
                minWidth: 0,
                height: "100%",
                width: "100%",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isCompactHeight ? "2px 4px" : { xs: "4px 0", sm: "8px 16px" },
                boxSizing: "border-box",
              }}
            >
              {outgoingImage && (
                <Box
                  key={`out-${outgoingImage.key}-${dialogImageNum}`}
                  component="img"
                  src={outgoingImage.src}
                  alt={outgoingImage.name}
                  draggable={false}
                  sx={{
                    position: "absolute",
                    maxHeight: isCompactHeight
                      ? "calc(100% - 4px)"
                      : { xs: "calc(100% - 8px)", sm: "calc(100% - 16px)" },
                    maxWidth: isCompactHeight
                      ? "calc(100% - 8px)"
                      : { xs: "100%", sm: "calc(100% - 32px)" },
                    width: "auto",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                    pointerEvents: "none",
                    animation: `${
                      outgoingImage.direction === "next"
                        ? slideOutToLeft
                        : slideOutToRight
                    } 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                  }}
                />
              )}

              <Box
                key={`in-${dialogImageNum}`}
                component="img"
                src={dialogImage.src}
                alt={dialogImage.name}
                draggable={false}
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  width: "auto",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                  pointerEvents: "none",
                  animation: `${
                    transitionDirection === "next"
                      ? slideInFromRight
                      : transitionDirection === "prev"
                        ? slideInFromLeft
                        : fadeZoomIn
                  } 0.34s cubic-bezier(0.22, 1, 0.36, 1) both`,
                }}
              />
            </Box>

            <IconButton
              size={isOverlayArrows ? "small" : "large"}
              disableRipple
              disableFocusRipple
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={handleArrowTouchStart}
              onTouchEnd={(e) => handleArrowTouchEnd(e, nextImg, nextRippleRef.current)}
              onClick={(e) => handleArrowClick(e, nextImg, nextRippleRef.current)}
              sx={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                overflow: "hidden",
                color: "#ffffff",
                backgroundColor: isOverlayArrows
                  ? "rgba(0, 0, 0, 0.38)"
                  : "rgba(255, 255, 255, 0.06)",
                zIndex: 5,
                flexShrink: 0,
                "&:hover, &:focus, &.Mui-focusVisible, &:active": {
                  backgroundColor: isOverlayArrows
                    ? "rgba(0, 0, 0, 0.38)"
                    : "rgba(255, 255, 255, 0.06)",
                },
                ...(isOverlayArrows
                  ? {
                      position: "absolute",
                      right: 6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: overlayControlsVisible ? 1 : 0,
                      transition: "opacity 0.45s ease, background-color 0.2s ease",
                    }
                  : {
                      "@media (hover: hover) and (pointer: fine)": {
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          transform: "scale(1.1)",
                        },
                      },
                    }),
              }}
              aria-label="Foto siguiente"
            >
              <Box
                ref={nextRippleRef}
                component="span"
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.35)",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              <KeyboardArrowRightIcon
                fontSize={isOverlayArrows ? "medium" : "large"}
              />
            </IconButton>
          </Box>

          {/* Bottom Bar: Title, Counter & Controls */}
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              flexDirection: isCompactHeight ? "row" : "column",
              alignItems: "center",
              justifyContent: isCompactHeight ? "space-between" : "center",
              gap: isCompactHeight ? 1.5 : { xs: 0.5, sm: 1 },
              pt: isCompactHeight ? 0.5 : { xs: 0.5, sm: 1 },
              pb: isCompactHeight ? 0.5 : { xs: 0.5, sm: 1 },
              px: isCompactHeight ? 1.5 : 1,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isCompactHeight ? "row" : "column",
                alignItems: "center",
                gap: isCompactHeight ? 1.5 : 0.25,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontFamily: "Montserrat",
                  fontSize: isCompactHeight ? "0.85rem" : { xs: "0.9rem", sm: "1rem" },
                  fontWeight: 500,
                  letterSpacing: 1,
                  textAlign: isCompactHeight ? "left" : "center",
                  whiteSpace: isCompactHeight ? "nowrap" : "normal",
                  overflow: isCompactHeight ? "hidden" : "visible",
                  textOverflow: isCompactHeight ? "ellipsis" : "clip",
                }}
              >
                {dialogImage.name}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "0.8rem",
                  flexShrink: 0,
                }}
              >
                {dialogImageNum + 1} / {images.length}
              </Typography>
            </Box>

            <ButtonGroup
              variant="outlined"
              size="small"
              disableRipple
              sx={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                mt: isCompactHeight ? 0 : 0.5,
                flexShrink: 0,
                "& .MuiButton-root": {
                  borderColor: "rgba(255, 255, 255, 0.25)",
                  color: "#ffffff",
                  "&:hover": {
                    borderColor: "#ffffff",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                },
              }}
            >
              {isSmallScreen && (
                <Button
                  disableFocusRipple
                  onMouseDown={(e) => e.preventDefault()}
                  onTouchStart={handleArrowTouchStart}
                  onTouchEnd={(e) => handleArrowTouchEnd(e, prevImg, null)}
                  onClick={(e) => handleArrowClick(e, prevImg, null)}
                  aria-label="Foto anterior"
                >
                  <KeyboardArrowLeftIcon fontSize="small" />
                </Button>
              )}

              <Button
                disableFocusRipple
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={handleArrowTouchStart}
                onTouchEnd={(e) =>
                  handleArrowTouchEnd(e, () => setPause((p) => !p), null)
                }
                onClick={(e) =>
                  handleArrowClick(e, () => setPause((p) => !p), null)
                }
                aria-label={pause ? "Reproducir diapositivas" : "Pausar diapositivas"}
              >
                {pause ? (
                  <PlayArrowIcon fontSize="small" />
                ) : (
                  <PauseIcon fontSize="small" />
                )}
              </Button>

              {isSmallScreen && (
                <Button
                  disableFocusRipple
                  onMouseDown={(e) => e.preventDefault()}
                  onTouchStart={handleArrowTouchStart}
                  onTouchEnd={(e) => handleArrowTouchEnd(e, nextImg, null)}
                  onClick={(e) => handleArrowClick(e, nextImg, null)}
                  aria-label="Foto siguiente"
                >
                  <KeyboardArrowRightIcon fontSize="small" />
                </Button>
              )}
            </ButtonGroup>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ImageLightbox;
