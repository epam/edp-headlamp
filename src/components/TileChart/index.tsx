import { PercentageCircle } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { ErrorContent } from '../ErrorContent';
import { StyledTileChartWrapper } from './styles';
import { MyTileChartProps } from './types';

export const MyTileChart = ({
  title,
  legend,
  total,
  data,
  BoxSx,
  error,
  ...others
}: MyTileChartProps) => {
  return (
    <StyledTileChartWrapper error={!!error}>
      <Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h6" color="primary.dark">
            {title}
          </Typography>
        </Stack>
        {error ? (
          <ErrorContent error={error} orientation="vertical" />
        ) : (
          <Stack direction="row" spacing={2}>
            <Box sx={BoxSx}>
              {!!data && <PercentageCircle data={data} total={total} {...others} />}
            </Box>
            {legend && <Box sx={{ pt: '16px' }}>{legend}</Box>}
          </Stack>
        )}
      </Stack>
    </StyledTileChartWrapper>
  );
};
