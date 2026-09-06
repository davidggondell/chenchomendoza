import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import bosqueIntro from '../../../assets/images/bosqueIntro.jpg';
import puestaSolIntro from '../../../assets/images/puestaSolIntro.jpg';
import menhiresIntro from '../../../assets/images/menhiresIntro.jpg';
import retratoIntro from '../../../assets/images/retratoIntro.jpg';
import firmaBlanca from '../../../assets/images/firmaBlanca.png';
import { useLanguage } from '../../../i18n';

const splashImages = [bosqueIntro, puestaSolIntro, menhiresIntro, retratoIntro];

export const StartLoader: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [bgImage] = useState<string>(() => {
    const rand = Math.floor(Math.random() * splashImages.length);
    return splashImages[rand];
  });

  const { t } = useLanguage();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Preload next splash images into browser memory
    splashImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const firmaImg = new Image();
    firmaImg.src = firmaBlanca;
  }, []);

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Box
      onClick={handleDismiss}
      onAnimationEnd={handleDismiss}
      className="fade-out-start"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: (theme) => theme.zIndex.modal + 500,
        backgroundColor: '#000000',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography
          className="zoom-in-text-start"
          sx={{
            fontFamily: 'Bebas Neue',
            fontSize: isSm ? 54 : 80,
            color: '#ffffff',
            textAlign: 'center',
            letterSpacing: isSm ? 3 : 6,
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.85)',
          }}
        >
          {t('project.startLoader.title')}
        </Typography>

        <Box
          component="img"
          src={firmaBlanca}
          alt="Firma Chencho Mendoza"
          className="zoom-in-text-start"
          sx={{
            maxWidth: isSm ? '280px' : '420px',
            width: '100%',
            filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.7))',
          }}
        />
      </Box>
    </Box>
  );
};

export default StartLoader;
