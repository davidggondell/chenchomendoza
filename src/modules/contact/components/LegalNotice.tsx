import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLanguage } from '../../../i18n';

export const LegalNotice: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          fontFamily: 'Bebas Neue',
          fontSize: 20,
          mb: 1.5,
          color: 'text.primary',
        }}
      >
        {t('project.contact.legalInfo')}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: 1.65,
          color: 'text.primary',
          textAlign: 'justify',
          mb: 1.5,
        }}
      >
        {t('project.contact.legalInfoTextFirst')}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: 1.65,
          color: 'text.primary',
          textAlign: 'justify',
        }}
      >
        {t('project.contact.legalInfoTextSecond')}
      </Typography>
    </Box>
  );
};

export default LegalNotice;
