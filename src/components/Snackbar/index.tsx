import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { SnackbarContent, SnackbarKey, useSnackbar } from 'notistack';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';

const SNACKBAR_VARIANT = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const Snackbar = React.forwardRef<
  HTMLDivElement,
  {
    snackbarKey: SnackbarKey;
    text: string;
    variant: string;
    pushLocation?: {
      href: {
        routeName: string;
        params: Record<string, string>;
      };
      text?: string;
    };
    externalLink?: {
      url: string;
      text?: string;
    };
    handleClose?: () => void;
  }
>((props, ref) => {
  const { text, variant, snackbarKey, pushLocation, externalLink } = props;
  const { closeSnackbar } = useSnackbar();

  const theme = React.useMemo(() => {
    let icon: string = ICONS.INFO;
    let color: string = '#0094FF';

    switch (variant) {
      case SNACKBAR_VARIANT.SUCCESS:
        icon = ICONS.CHECK_CIRCLE;
        color = '#18BE94';
        break;
      case SNACKBAR_VARIANT.ERROR:
        icon = ICONS.CROSS_CIRCLE;
        color = '#FD4C4D';
        break;
      case SNACKBAR_VARIANT.WARNING:
        icon = ICONS.WARNING;
        color = '#FFC754';
        break;
      case SNACKBAR_VARIANT.INFO:
        icon = ICONS.INFO;
        color = '#0094FF';
        break;
      default:
        icon = ICONS.INFO;
        color = '#0094FF';
        break;
    }

    return {
      icon,
      color,
    };
  }, [variant]);

  const handleClose = () => {
    closeSnackbar(snackbarKey);
  };

  return (
    <SnackbarContent ref={ref} role={variant}>
      <Box
        sx={{
          minHeight: (t) => t.typography.pxToRem(30),
          borderRadius: (t) => t.typography.pxToRem(t.shape.borderRadius),
          padding: (t) => `${t.typography.pxToRem(6)} ${t.typography.pxToRem(16)}`,
          backgroundColor: theme.color,
          minWidth: (t) => t.typography.pxToRem(400),
          color: 'white',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mr: 'auto !important' }}>
            <Icon icon={theme.icon} width={20} height={20} color="white" />
            <Typography variant="body2" color="white">
              {text}
            </Typography>
          </Stack>
          {pushLocation && (
            <Button
              component={Link}
              size="small"
              variant="outlined"
              color="inherit"
              routeName={pushLocation.href.routeName}
              params={pushLocation.href.params}
              onClick={handleClose}
            >
              {pushLocation.text || 'Go to page'}
            </Button>
          )}
          {externalLink && (
            <Button
              component="a"
              size="small"
              variant="outlined"
              color="inherit"
              href={externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
            >
              {externalLink.text || 'View'}
            </Button>
          )}
          <IconButton size="small" onClick={handleClose}>
            <Icon icon={ICONS.CROSS} color="white" width={20} height={20} />
          </IconButton>
        </Stack>
      </Box>
    </SnackbarContent>
  );
});
