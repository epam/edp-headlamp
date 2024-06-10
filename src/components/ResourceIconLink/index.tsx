import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Link as MuiLink, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { ResourceIconLinkProps } from './types';

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

const DisabledResourceIconLink = ({
  tooltipTitle,
  icon,
  withoutDisabledStyle,
  variant,
  isTextButton,
  name,
  size,
}: ResourceIconLinkProps) => {
  const theme = useTheme();

  return isTextButton ? (
    <Button
      variant={variant}
      disabled
      sx={!withoutDisabledStyle ? { opacity: 0.5 } : {}}
      endIcon={<Icon icon={ICONS.NEW_WINDOW} color={theme.palette.grey['500']} width="20" />}
      size={size}
    >
      Open in {name}
    </Button>
  ) : (
    <Tooltip title={<div>{tooltipTitle}</div>}>
      <div>
        <IconButton disabled style={!withoutDisabledStyle ? { opacity: 0.5 } : {}} size={size}>
          <Icon icon={icon} color={theme.palette.grey['500']} width="20" />
        </IconButton>
      </div>
    </Tooltip>
  );
};

const EnabledResourceIconLink = ({
  tooltipTitle,
  icon,
  link,
  variant,
  isTextButton,
  name,
  size,
}: ResourceIconLinkProps) => {
  const theme = useTheme();

  return isTextButton ? (
    <Button
      variant={variant}
      component={MuiLink}
      href={link}
      target={'_blank'}
      endIcon={
        <Icon
          icon={'material-symbols:open-in-new'}
          color={theme.palette.secondary.dark}
          width="20"
        />
      }
      size={size}
      sx={{ color: theme.palette.secondary.dark, borderColor: theme.palette.secondary.dark }}
    >
      {name}
    </Button>
  ) : (
    <Tooltip
      title={
        <Grid container alignItems={'center'} spacing={1}>
          <Grid item>{tooltipTitle}</Grid>
          <span> </span>
          <Grid item>
            <Icon
              icon={ICONS.NEW_WINDOW}
              width="15"
              height="15"
              color={theme.palette.common.white}
            />
          </Grid>
        </Grid>
      }
    >
      <span>
        <IconButton component={MuiLink} href={link} target={'_blank'} size={size}>
          <Icon icon={icon} width="20" height="20" color={theme.palette.text.primary} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const ResourceIconLink = ({
  disabled = false,
  tooltipTitle,
  icon,
  link,
  withoutDisabledStyle,
  variant,
  name,
  size,
  isTextButton,
}: ResourceIconLinkProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={stopPropagation} onFocus={stopPropagation}>
      {disabled ? (
        <DisabledResourceIconLink
          tooltipTitle={tooltipTitle}
          icon={icon}
          withoutDisabledStyle={withoutDisabledStyle}
          variant={variant}
          isTextButton={isTextButton}
          name={name}
          size={size}
        />
      ) : (
        <EnabledResourceIconLink
          tooltipTitle={tooltipTitle}
          icon={icon}
          link={link}
          variant={variant}
          isTextButton={isTextButton}
          name={name}
          size={size}
        />
      )}
    </div>
  );
};
