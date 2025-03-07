import { Icon } from '@iconify/react';
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { CopyButton } from '../CopyButton';
import { SectionProps } from './types';

export const Section: React.FC<SectionProps> = ({
  title,
  titleTooltip,
  enableCopyTitle,
  description,
  children,
}) => {
  const theme = useTheme();
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        {title && (
          <Stack direction="row" spacing={0.5} alignItems={'center'}>
            {typeof title === 'string' ? (
              <Typography color="primary.dark" fontSize={theme.typography.pxToRem(48)}>
                {title}
              </Typography>
            ) : (
              title
            )}
            {titleTooltip && (
              <Tooltip title={titleTooltip}>
                <Icon icon={ICONS.INFO_CIRCLE} width={18} />
              </Tooltip>
            )}
            {enableCopyTitle && typeof title === 'string' && <CopyButton text={title} />}
          </Stack>
        )}
        {description && <Typography variant={'body1'}>{description}</Typography>}
      </Stack>

      <Box sx={{ mt: theme.typography.pxToRem(16) }}>{children}</Box>
    </Stack>
  );
};
