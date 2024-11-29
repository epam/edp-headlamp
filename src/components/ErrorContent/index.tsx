import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

export const ErrorContent = ({
  error,
  outlined,
  orientation = 'horizontal',
}: {
  error: ApiError;
  outlined?: boolean;
  orientation?: 'vertical' | 'horizontal';
}) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const renderError = React.useCallback(() => {
    switch (error?.status) {
      case 403:
        return (
          <Stack
            direction={orientation === 'horizontal' ? 'row' : 'column'}
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Icon icon={'ph:warning-fill'} color="#A2A7B7" width={48} height={48} />
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography component="span" fontSize={theme.typography.pxToRem(14)} color="#596D80">
                Sorry. You don't have permissions to access this data.
              </Typography>
              <Link
                component={'button'}
                onClick={handleOpen}
                sx={{ fontSize: theme.typography.pxToRem(14) }}
              >
                More details
              </Link>
            </Stack>
          </Stack>
        );
      case 404:
        return (
          <Stack
            direction={orientation === 'horizontal' ? 'row' : 'column'}
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Icon icon={'tabler:error-404'} color="#A2A7B7" width={48} height={48} />
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography component="span" fontSize={theme.typography.pxToRem(14)} color="#596D80">
                Sorry. The requested resource was not found.
              </Typography>
              <Link
                component={'button'}
                onClick={handleOpen}
                sx={{ fontSize: theme.typography.pxToRem(14) }}
              >
                More details
              </Link>
            </Stack>
          </Stack>
        );
      default:
        return 'Oops! Something went wrong. Please try again later.';
    }
  }, [error?.status, orientation, theme.typography]);

  return (
    <Box
      width="100%"
      sx={
        outlined
          ? {
              p: theme.typography.pxToRem(10),
              borderTop: `1px solid ${theme.palette.action.selected}`,
              borderBottom: `1px solid ${theme.palette.action.selected}`,
            }
          : null
      }
    >
      <EmptyContent>{renderError()}</EmptyContent>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>More Details</DialogTitle>
        <DialogContent>
          <Typography>{error?.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
