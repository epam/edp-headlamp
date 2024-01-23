import { Icon } from '@iconify/react';
import { Box, Grid, Link, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { rem } from '../../utils/styling/rem';
import { EmptyListProps } from './types';

export const EmptyList = ({
  customText,
  missingItemName,
  linkText = 'Click here to add a new one',
  description,
  handleClick,
  isSearch = false,
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
        sx={{
          padding: rem(10),
          maxWidth: rem(640),
          width: '100%',
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: rem(4),
        }}
      >
        <Box sx={{ mb: rem(16) }}>
          <Icon icon={isSearch ? ICONS.SEARCH : ICONS.WARNING} width={rem(30)} height={rem(30)} />
        </Box>
        <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          spacing={1}
          style={{ marginBottom: rem(5) }}
        >
          <Grid item>
            <Typography variant={'body1'}>
              {customText ? customText : `There are no ${missingItemName} here.`}
            </Typography>
          </Grid>
          {!!linkText && !!handleClick && (
            <Grid item>
              <Link onClick={handleClick} component={'button'}>
                <Typography>{linkText}</Typography>
              </Link>
            </Grid>
          )}
        </Grid>
        {!!description && (
          <Typography variant={'body2'} color={'textSecondary'}>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
