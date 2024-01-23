import { Icon } from '@iconify/react';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SectionProps } from './types';

export const Section: React.FC<SectionProps> = ({ title, titleTooltip, description, children }) => {
  return (
    <Grid container spacing={4}>
      {title && (
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item style={{ flexGrow: !!titleTooltip ? 0 : 1 }}>
              <Typography variant={'h1'}>{title}</Typography>
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
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};
