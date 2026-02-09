import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DIALOG_NAME } from './constants';
import { ConfirmDialogProps } from './types';

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  props: { actionCallback, text },
  state: { open, closeDialog },
}) => {
  const { register, watch, reset } = useForm();

  const confirmFieldValue = watch('confirm');
  const isSubmitNotAllowed = confirmFieldValue !== 'confirm';

  const handleClosePopup = React.useCallback(() => closeDialog(), [closeDialog]);

  const onSubmit = React.useCallback(async () => {
    await actionCallback();
    handleClosePopup();
    reset();
  }, [actionCallback, handleClosePopup, reset]);

  return (
    <Dialog open={open} onClose={handleClosePopup} fullWidth data-testid="dialog">
      <DialogTitle>Confirm action</DialogTitle>
      <DialogContent>
        <div>
          <Grid container spacing={2}>
            {!!text && (
              <Grid item xs={12}>
                <Typography variant={'subtitle1'}>{text}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                {...register('confirm', { required: true })}
                label={'Enter "confirm" to confirm action'}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button type={'button'} onClick={handleClosePopup}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitNotAllowed}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.displayName = DIALOG_NAME;
