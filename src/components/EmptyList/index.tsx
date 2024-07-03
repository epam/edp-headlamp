import { Icon } from '@iconify/react';
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EmptyListProps } from './types';

export const EmptyList = ({
  customText,
  missingItemName,
  linkText = 'Click here to add a new one',
  beforeLinkText,
  description,
  handleClick,
  isSearch = false,
  icon,
}: EmptyListProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent="center"
        sx={{
          padding: theme.typography.pxToRem(10),
          width: '100%',
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: theme.typography.pxToRem(4),
        }}
      >
        <Box sx={{ mb: theme.typography.pxToRem(16) }}>
          {icon ? (
            icon
          ) : (
            <Icon
              icon={isSearch ? ICONS.SEARCH : ICONS.WARNING}
              width={theme.typography.pxToRem(128)}
              height={theme.typography.pxToRem(128)}
              color="#A2A7B7"
            />
          )}
        </Box>
        <Stack
          spacing={1}
          alignItems="center"
          style={{ marginBottom: theme.typography.pxToRem(5) }}
        >
          <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
            {customText ? customText : `There are no ${missingItemName} here.`}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {!!beforeLinkText && (
              <Typography variant={'body2'} component="span" color={'textSecondary'}>
                {beforeLinkText}
              </Typography>
            )}
            {!!linkText && !!handleClick && (
              <Link onClick={handleClick} component={'button'} lineHeight={1}>
                <Typography component="span" variant={'body2'}>
                  {linkText}
                </Typography>
              </Link>
            )}
          </Stack>
        </Stack>
        {!!description && (
          <Typography variant={'body2'} color={'textSecondary'}>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
