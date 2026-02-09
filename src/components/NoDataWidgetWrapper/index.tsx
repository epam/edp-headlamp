import { Icon } from '@iconify/react';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { STATUS_COLOR } from '../../constants/colors';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { NoDataWidgetWrapperProps } from './types';

export const NoDataWidgetWrapper: React.FC<NoDataWidgetWrapperProps> = ({
  hasData,
  isLoading,
  text = 'No data available.',
  children,
}) => {
  return !isLoading && !hasData ? (
    <Stack
      spacing={1}
      alignItems="center"
      direction="row"
      maxWidth={(t) => t.typography.pxToRem(520)}
    >
      <Icon
        icon={ICONS.WARNING}
        width={32}
        height={32}
        color={STATUS_COLOR.UNKNOWN}
        style={{ flexShrink: 0 }}
      />
      {typeof text === 'string' ? (
        <Typography variant={'body1'} color="secondary.dark">
          {text}
        </Typography>
      ) : (
        text
      )}
    </Stack>
  ) : (
    <>{children}</>
  );
};
