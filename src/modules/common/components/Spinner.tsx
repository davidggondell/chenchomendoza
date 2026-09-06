import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface SpinnerProps {
  fullPage?: boolean;
  size?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ fullPage = false, size = 48 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: fullPage ? '80vh' : '200px',
      }}
    >
      <CircularProgress size={size} color="inherit" />
    </Box>
  );
};

export default Spinner;
