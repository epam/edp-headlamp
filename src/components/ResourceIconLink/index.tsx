import { Icon } from '@iconify/react';
import { Grid, IconButton, Link as MuiLink, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { ResourceIconLinkProps } from './types';

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

const DisabledResourceIconLink = ({
  tooltipTitle,
  icon,
  withoutDisabledStyle,
}: ResourceIconLinkProps) => {
  const theme = useTheme();

  return (
    <Tooltip title={tooltipTitle}>
      <span>
        <IconButton disabled style={!withoutDisabledStyle ? { opacity: 0.5 } : {}} size="large">
          <Icon icon={icon} color={theme.palette.grey['500']} width="20" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

const EnabledResourceIconLink = ({ tooltipTitle, icon, link }: ResourceIconLinkProps) => {
  const theme = useTheme();

  return (
    <Tooltip
      title={
        <Grid container alignItems={'center'} spacing={1}>
          <Grid item>{tooltipTitle}</Grid>
          <span> </span>
          <Grid item>
            <Icon icon={ICONS.NEW_WINDOW} color={theme.palette.grey['500']} width="15" />
          </Grid>
        </Grid>
      }
    >
      <span>
        <IconButton component={MuiLink} href={link} target={'_blank'} size="large">
          <Icon icon={icon} color={theme.palette.grey['500']} width="20" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const ResourceIconLink = ({
  disabled,
  tooltipTitle,
  icon,
  link,
  withoutDisabledStyle,
}: ResourceIconLinkProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={stopPropagation} onFocus={stopPropagation}>
      {disabled ? (
        <DisabledResourceIconLink
          tooltipTitle={tooltipTitle}
          icon={icon}
          withoutDisabledStyle={withoutDisabledStyle}
        />
      ) : (
        <EnabledResourceIconLink tooltipTitle={tooltipTitle} icon={icon} link={link} />
      )}
    </div>
  );
};
