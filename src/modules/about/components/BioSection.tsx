import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import portraitImg from '../../../assets/images/retrato.jpg';
import panoramicImg from '../../../assets/images/panoramicAbout.jpg';
import { useLanguage } from '../../../i18n';

export const BioSection: React.FC = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', maxWidth: '720px', mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Bebas Neue',
          pt: { xs: 2, md: 4 },
          pb: 2,
          textAlign: 'center',
          letterSpacing: '2px',
        }}
      >
        {t('project.aboutme.title')}
      </Typography>

      <Box sx={{ overflow: 'hidden', mb: 4 }}>
        <Box
          component="img"
          src={portraitImg}
          alt="José Luis García Mendoza (Chencho Mendoza)"
          sx={{
            width: isSm ? '100%' : '44%',
            float: isSm ? 'none' : 'left',
            pr: isSm ? 0 : 3,
            pb: isSm ? 2 : 1,
            display: 'block',
            mx: isSm ? 'auto' : 0,
            borderRadius: '2px',
          }}
        />

        <Typography
          sx={{
            textAlign: 'justify',
            fontSize: isSm ? 13 : 15,
            lineHeight: 1.7,
            color: 'text.primary',
            mb: 2,
          }}
        >
          {t('project.aboutme.text.first')}
        </Typography>

        <Typography
          sx={{
            textAlign: 'justify',
            fontSize: isSm ? 13 : 15,
            lineHeight: 1.7,
            color: 'text.primary',
            mb: 2,
          }}
        >
          {t('project.aboutme.text.second')}
        </Typography>

        <Typography
          sx={{
            textAlign: 'justify',
            fontSize: isSm ? 13 : 15,
            lineHeight: 1.7,
            color: 'text.primary',
          }}
        >
          {t('project.aboutme.text.third')}
        </Typography>
      </Box>

      <Box sx={{ width: '100%', mt: 3, mb: 4 }}>
        <Box
          component="img"
          src={panoramicImg}
          alt="Paisaje panorámico"
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '2px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          }}
        />
      </Box>
    </Box>
  );
};

export default BioSection;
