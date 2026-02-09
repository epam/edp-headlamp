import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

export const TabSection = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string | React.ReactNode;
}) => {
  return (
    <Box sx={{ mt: (t) => t.typography.pxToRem(24) }}>
      <Stack spacing={3}>
        <Box>
          {typeof title === 'string' ? (
            <Typography fontSize={28} color="primary.dark">
              {title}
            </Typography>
          ) : (
            title
          )}
        </Box>
        {children}
      </Stack>
    </Box>
  );
};
