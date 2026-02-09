import { Icon } from '@iconify/react';
import {
  Button,
  ButtonProps,
  Grid,
  IconButton,
  Link as MuiLink,
  Tooltip,
  useTheme,
} from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { sanitizeSvgBase64 } from '../../utils/sanitizeSvg';
import { ResourceIconLinkProps } from './types';

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

const iconSizeByBtnSize = (btnSize: ButtonProps['size']) => {
  switch (btnSize) {
    case 'small':
      return 16;
    case 'medium':
      return 20;
  }
};

const DisabledResourceIconLink = ({
  tooltipTitle,
  icon,
  iconBase64,
  withoutDisabledStyle,
  variant,
  isTextButton,
  name,
  size,
}: ResourceIconLinkProps) => {
  const theme = useTheme();

  const iconSize = iconSizeByBtnSize(size);
  const sanitizedIcon = sanitizeSvgBase64(iconBase64);

  return isTextButton ? (
    <Button
      variant={variant}
      disabled
      sx={!withoutDisabledStyle ? { opacity: 0.5 } : {}}
      endIcon={<Icon icon={ICONS.NEW_WINDOW} color={theme.palette.grey['500']} width={iconSize} />}
      size={size}
    >
      {name}
    </Button>
  ) : (
    <Tooltip title={<div>{tooltipTitle}</div>}>
      <div>
        <IconButton disabled style={!withoutDisabledStyle ? { opacity: 0.5 } : {}} size={size}>
          {iconBase64 ? (
            <img
              src={`data:image/svg+xml;base64,${sanitizedIcon}`}
              style={{ width: theme.typography.pxToRem(16), height: theme.typography.pxToRem(16) }}
              alt=""
            />
          ) : icon ? (
            <Icon
              icon={icon}
              color={theme.palette.grey['500']}
              width={iconSize}
              height={iconSize}
            />
          ) : null}
        </IconButton>
      </div>
    </Tooltip>
  );
};

const EnabledResourceIconLink = ({
  tooltipTitle,
  icon,
  iconBase64,
  link,
  variant,
  isTextButton,
  name,
  size,
}: ResourceIconLinkProps) => {
  const theme = useTheme();
  const iconSize = iconSizeByBtnSize(size);
  const sanitizedIcon = sanitizeSvgBase64(iconBase64);

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
          width={iconSize}
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
          {iconBase64 ? (
            <img
              src={`data:image/svg+xml;base64,${sanitizedIcon}`}
              style={{ width: theme.typography.pxToRem(16), height: theme.typography.pxToRem(16) }}
              alt=""
            />
          ) : icon ? (
            <Icon
              icon={icon}
              color={theme.palette.grey['500']}
              width={iconSize}
              height={iconSize}
            />
          ) : null}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const ResourceIconLink = ({
  disabled = false,
  tooltipTitle,
  icon,
  iconBase64,
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
          iconBase64={iconBase64}
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
          iconBase64={iconBase64}
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
