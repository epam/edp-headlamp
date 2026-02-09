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
import { CRUD_TYPE } from '../../../constants/crudTypes';
import { rem } from '../../../utils/styling/rem';
import { DIALOG_NAME } from './constants';
import { ConfirmResourcesUpdatesDialogProps } from './types';

export const ConfirmResourcesUpdatesDialog: React.FC<ConfirmResourcesUpdatesDialogProps> = ({
  props,
  state,
}) => {
  const { deleteCallback, text, resourcesArray } = props;
  const { closeDialog, open } = state;
  const { register, watch, reset } = useForm();

  const confirmFieldValue = watch('confirm');
  const isSubmitNotAllowed = confirmFieldValue !== 'confirm';

  const handleClosePopup = React.useCallback(() => closeDialog(), [closeDialog]);

  const onSubmit = React.useCallback(async () => {
    await deleteCallback();
    handleClosePopup();
    reset();
  }, [deleteCallback, handleClosePopup, reset]);

  return (
    <Dialog open={open} onClose={handleClosePopup} fullWidth data-testid="dialog">
      <DialogTitle>Confirm action</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: rem(40) }}>
          <Grid container spacing={2}>
            {!!text && (
              <Grid item xs={12}>
                <Typography variant={'subtitle1'}>{text}</Typography>
              </Grid>
            )}
            {!!resourcesArray && (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {resourcesArray
                    ? resourcesArray.map(({ name, kind, actionType }) => {
                        return (
                          <Grid item xs={12} key={name}>
                            <Typography
                              variant={'body2'}
                              component={'span'}
                              style={{
                                fontStyle: 'italic',
                                marginRight: '5px',
                              }}
                            >
                              {kind}
                            </Typography>
                            <Typography
                              variant={'body2'}
                              component={'span'}
                              style={{
                                fontWeight: 'bold',
                                marginRight: '5px',
                              }}
                            >
                              {name}
                            </Typography>
                            <Typography variant={'body2'} component={'span'}>
                              will be{' '}
                              {actionType === CRUD_TYPE.EDIT
                                ? 'updated'
                                : CRUD_TYPE.DELETE
                                ? 'deleted'
                                : CRUD_TYPE.CREATE
                                ? 'created'
                                : ''}
                            </Typography>
                          </Grid>
                        );
                      })
                    : null}
                </Grid>
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

ConfirmResourcesUpdatesDialog.displayName = DIALOG_NAME;
