import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

export const LegendListItem = ({
  color,
  number,
  label,
}: {
  color: string;
  number: number;
  label: string;
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box
        sx={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
      <Typography fontSize="15px" fontWeight={500} color="primary.dark">
        {number}
      </Typography>
      <Typography fontSize="15px" color="secondary.dark">
        {label}
      </Typography>
    </Stack>
  );
};
