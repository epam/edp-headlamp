import { PercentageCircle } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { StyledTileChartWrapper } from './styles';
import { MyTileChartProps } from './types';

export const MyTileChart = ({ title, legend, total, data, BoxSx, ...others }: MyTileChartProps) => {
  return (
    <StyledTileChartWrapper>
      <Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h6" color="primary.dark">
            {title}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box sx={BoxSx}>
            {!!data && <PercentageCircle data={data} total={total} {...others} />}
          </Box>
          <Box sx={{ pt: '16px' }}>{legend}</Box>
        </Stack>
      </Stack>
    </StyledTileChartWrapper>
  );
};
