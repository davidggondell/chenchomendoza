import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useLanguage } from '../../../i18n';
import type { Language } from '../../../types';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'gl', label: 'GL' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <ButtonGroup
        size="small"
        variant="outlined"
        sx={{
          borderRadius: '999px',
          '& .MuiButtonGroup-grouped': {
            borderColor: 'rgba(0, 0, 0, 0.15) !important',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '2px 10px',
            minWidth: '36px',
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.15) !important',
            },
          },
        }}
      >
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <Button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              sx={{
                backgroundColor: isSelected ? '#e2e2e2' : 'transparent',
                color: isSelected ? '#222222' : '#666666',
                fontWeight: isSelected ? 700 : 500,
                '&:hover': {
                  backgroundColor: isSelected ? '#d8d8d8' : 'rgba(0, 0, 0, 0.04)',
                  color: isSelected ? '#000000' : '#111111',
                  borderColor: 'rgba(0, 0, 0, 0.15) !important',
                },
              }}
            >
              {lang.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};

export default LanguageSelector;
