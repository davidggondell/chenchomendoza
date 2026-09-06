import React from 'react';
import { Box, Alert } from '@mui/material';

interface ErrorAlertProps {
  severity?: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  severity = 'error',
  message,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 3,
      }}
    >
      <Alert
        severity={severity}
        sx={{
          maxWidth: '560px',
          width: '100%',
          borderRadius: 2,
        }}
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
