import { Icon } from '@iconify/react';
import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { rem } from '../../../../utils/styling/rem';
import { useStyles } from './styles';
import { FormControlLabelWithTooltipProps } from './types';

export const FormControlLabelWithTooltip = ({
  label,
  title,
  disabled,
}: FormControlLabelWithTooltipProps) => {
  const classes = useStyles(disabled);

  return (
    <span className={classes.labelWrap}>
      <Typography component={'span'} className={classes.label}>
        {label}
      </Typography>
      {title ? (
        <Tooltip title={title}>
          <Icon icon={ICONS.INFO_CIRCLE} width={15} />
        </Tooltip>
      ) : (
        <Box style={{ height: rem(20) }} />
      )}
    </span>
  );
};
