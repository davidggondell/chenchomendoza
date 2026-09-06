import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  ButtonGroup,
  Button,
  Typography,
  Fade,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useInterval } from '../../common/hooks/useInterval';
import { useSwipe } from '../../common/hooks/useSwipe';
import type { ImageItem } from '../../../types';

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
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(true); // default paused unless user plays
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setDialogImageNum(initialIndex);
    setFadeIn(true);
  }, [initialIndex, open]);

  const nextImg = useCallback(() => {
    setFadeIn(false);
    setTimeout(() => {
      setDialogImageNum((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
      setFadeIn(true);
    }, 50);
  }, [images.length]);

  const prevImg = useCallback(() => {
    setFadeIn(false);
    setTimeout(() => {
      setDialogImageNum((prev) => (prev <= 0 ? images.length - 1 : prev - 1));
      setFadeIn(true);
    }, 50);
  }, [images.length]);

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
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        nextImg();
      } else if (e.key === 'ArrowLeft') {
        prevImg();
      } else if (e.key === ' ') {
        e.preventDefault();
        setPause((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, nextImg, prevImg]);

  // Touch gesture support
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
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
        '& .MuiDialog-paper': {
          backgroundColor: '#282828',
          color: '#ffffff',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          userSelect: 'none',
        }}
      >
        {/* Close Button */}
        <Box
          sx={{
            position: 'absolute',
            zIndex: 10,
            top: 14,
            right: 14,
          }}
        >
          <IconButton
            size="large"
            onClick={onClose}
            sx={{
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: { xs: 1, sm: 3 },
            boxSizing: 'border-box',
          }}
        >
          {/* Main Photo Stage */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {!isSmallScreen && (
              <IconButton
                size="large"
                onClick={prevImg}
                sx={{
                  color: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  zIndex: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)',
                  },
                }}
                aria-label="Foto anterior"
              >
                <KeyboardArrowLeftIcon fontSize="large" />
              </IconButton>
            )}

            <Box
              sx={{
                flex: 1,
                height: '100%',
                maxHeight: { xs: '72vh', sm: '82vh' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: 0.5, sm: 2 },
              }}
            >
              <Fade in={fadeIn} timeout={600}>
                <Box
                  component="img"
                  src={dialogImage.src}
                  alt={dialogImage.name}
                  onContextMenu={(e) => e.preventDefault()}
                  sx={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                  }}
                />
              </Fade>
            </Box>

            {!isSmallScreen && (
              <IconButton
                size="large"
                onClick={nextImg}
                sx={{
                  color: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  zIndex: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)',
                  },
                }}
                aria-label="Foto siguiente"
              >
                <KeyboardArrowRightIcon fontSize="large" />
              </IconButton>
            )}
          </Box>

          {/* Bottom Bar: Title, Counter & Controls */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              pb: 1,
              width: '100%',
            }}
          >
            <Typography
              sx={{
                color: '#ffffff',
                fontFamily: 'Montserrat',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 500,
                letterSpacing: 1,
                textAlign: 'center',
              }}
            >
              {dialogImage.name}
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.8rem',
              }}
            >
              {dialogImageNum + 1} / {images.length}
            </Typography>

            <ButtonGroup
              variant="outlined"
              size="small"
              sx={{
                mt: 0.5,
                '& .MuiButton-root': {
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  '&:hover': {
                    borderColor: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              }}
            >
              {isSmallScreen && (
                <Button onClick={prevImg} aria-label="Foto anterior">
                  <KeyboardArrowLeftIcon fontSize="small" />
                </Button>
              )}

              <Button
                onClick={() => setPause(!pause)}
                aria-label={pause ? 'Reproducir diapositivas' : 'Pausar diapositivas'}
              >
                {pause ? (
                  <PlayArrowIcon fontSize="small" />
                ) : (
                  <PauseIcon fontSize="small" />
                )}
              </Button>

              {isSmallScreen && (
                <Button onClick={nextImg} aria-label="Foto siguiente">
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
