import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { BorderedSectionProps } from './types';

export const BorderedSection = ({ title, children }: BorderedSectionProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: '0px 1px 10px 0px #0024461F',
        borderLeft: (t) => `4px solid ${t.palette.primary.main}`,
        borderRadius: '4px',
        padding: (t) => t.typography.pxToRem(24),
      }}
    >
      <Stack spacing={3}>
        {typeof title === 'string' ? (
          <Typography fontSize={20} fontWeight={600} color="primary.dark">
            {title}
          </Typography>
        ) : (
          title
        )}
        {children}
      </Stack>
    </Box>
  );
};
