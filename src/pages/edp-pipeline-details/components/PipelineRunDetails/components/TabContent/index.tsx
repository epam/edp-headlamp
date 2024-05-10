import { Box } from '@mui/material';
import React from 'react';

export const TabContent = ({ children }) => {
  return (
    <Box
      sx={{
        pt: (t) => t.typography.pxToRem(24),
      }}
    >
      {children}
    </Box>
  );
};
