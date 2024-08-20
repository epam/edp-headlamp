import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { SnackbarContent, useSnackbar } from 'notistack';
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
    text: string;
    variant: string;
    pushLocation?: () => void;
    handleClose?: () => void;
  }
>((props, ref) => {
  const { text, variant, handleClose, pushLocation } = props;
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
              size="small"
              variant="outlined"
              color="inherit"
              onClick={() => {
                pushLocation();
                closeSnackbar();
              }}
            >
              go to page
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
