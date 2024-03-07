import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SectionProps } from './types';

export const Section: React.FC<SectionProps> = ({ title, titleTooltip, description, children }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {title && (
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems={'center'}>
                <Grid item style={{ flexGrow: !!titleTooltip ? 0 : 1 }}>
                  {typeof title === 'string' ? (
                    <Typography variant={'h1'}>{title}</Typography>
                  ) : (
                    title
                  )}
                </Grid>
                {titleTooltip && (
                  <Grid item>
                    <Tooltip title={titleTooltip}>
                      <Icon icon={ICONS.INFO_CIRCLE} width={18} />
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
          {description && (
            <Grid item xs={12}>
              <Typography variant={'body1'}>{description}</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: theme.typography.pxToRem(16) }}>
        {children}
      </Grid>
    </Grid>
  );
};
