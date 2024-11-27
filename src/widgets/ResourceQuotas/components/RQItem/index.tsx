import { PercentageCircle } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { QuotaDetails } from '../../types';
import { getColorByLoadPercentage } from '../../utils';

export const RQItem = ({ entity, details }: { entity: string; details: QuotaDetails }) => {
  const theme = useTheme();

  const { hard, used } = details;
  const loadPercentage = Math.floor((used / hard) * 100);
  const color = getColorByLoadPercentage(theme, loadPercentage);

  return (
    <Box sx={{ flex: '1 1 0', minWidth: theme.typography.pxToRem(100) }}>
      <Stack alignItems="center" spacing={1}>
        <Typography color="primary.dark" variant="subtitle2">
          {entity}
        </Typography>
        <Box sx={{ width: '40px', height: '40px' }}>
          <PercentageCircle
            data={[
              {
                name: 'OK',
                value: loadPercentage,
                fill: color,
              },
            ]}
            total={100}
            size={50}
            thickness={6}
          />
        </Box>
        <Typography color="primary.dark" variant="caption">
          {details?.['used_initial']} / {details?.['hard_initial']}
        </Typography>
      </Stack>
    </Box>
  );
};
