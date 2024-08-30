import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { DIALOG_NAME } from './constants';
import { SuccessGraphDialogProps } from './types';

export const SuccessDialog: React.FC<SuccessGraphDialogProps> = ({
  props: { dialogTitle, title, description, goToLink },
  state: { closeDialog, open },
}) => {
  const theme = useTheme();

  return (
    <Dialog open={open} fullWidth onClose={() => closeDialog()} maxWidth={'sm'}>
      <DialogTitle>
        <Typography fontSize={theme.typography.pxToRem(20)} fontWeight={500}>
          {dialogTitle}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1} alignItems="center">
          <Icon icon="ph:confetti" width={theme.typography.pxToRem(128)} color="#A2A7B7" />
          {title && (
            <Typography
              color="primary.dark"
              fontSize={theme.typography.pxToRem(20)}
              fontWeight={500}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography color="secondary.dark" fontSize={theme.typography.pxToRem(14)}>
              {description}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog()} color="primary">
          Close
        </Button>
        <Button
          component={Link}
          routeName={goToLink.routeName}
          params={goToLink.routeParams}
          color="primary"
          variant="contained"
          onClick={() => closeDialog()}
        >
          {goToLink.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SuccessDialog.displayName = DIALOG_NAME;
