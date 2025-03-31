import {
  Button,
  CircularProgress,
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
import { useHistory } from 'react-router-dom';
import { useDeleteKubeObject } from '../../../k8s/common/hooks/useDeleteKubeObject';
import { DIALOG_NAME } from './constants';
import { DeleteKubeObjectDialogProps } from './types';

const NAMES = {
  name: 'name',
};

const getDialogTitle = (errorTemplate: React.ReactNode, objectName: string): string =>
  !errorTemplate ? `Confirm deletion of "${objectName}"` : `Cannot start deleting "${objectName}"`;

export const DeleteKubeObjectDialog: React.FC<DeleteKubeObjectDialogProps> = (_props) => {
  const { props, state } = _props;
  const { open, closeDialog, openDialog } = state;
  const {
    onSuccess,
    objectName,
    kubeObjectData,
    kubeObject,
    onBeforeSubmit,
    description,
    backRoute,
    createCustomMessages,
  } = props;

  const history = useHistory();

  const [errorTemplate, setErrorTemplate] = React.useState<React.ReactNode | string>(null);
  const [loadingActive, setLoadingActive] = React.useState<boolean>(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const kubeObjectNameFieldValue = watch(NAMES.name);

  const handleClosePopup = React.useCallback(
    (_?, reason?: string) => (reason !== 'backdropClick' ? closeDialog() : false),
    [closeDialog]
  );

  const handleOpenPopup = React.useCallback(() => {
    openDialog();
  }, [openDialog]);

  const { deleteKubeObject } = useDeleteKubeObject({
    onSuccess: onSuccess,
    onError: handleOpenPopup,
    createCustomMessages,
  });

  const onSubmit = React.useCallback(
    async ({ name }) => {
      if (errorTemplate || objectName !== name) {
        return;
      }

      handleClosePopup();
      await deleteKubeObject({
        kubeObject,
        variables: kubeObjectData,
      });
      reset();

      if (backRoute) {
        history.push(backRoute);
      }
    },
    [
      errorTemplate,
      objectName,
      handleClosePopup,
      deleteKubeObject,
      kubeObject,
      kubeObjectData,
      reset,
      backRoute,
      history,
    ]
  );

  React.useEffect(() => {
    (async () => {
      const validateObject = async () => {
        if (onBeforeSubmit !== undefined && open) {
          await onBeforeSubmit(setErrorTemplate, setLoadingActive);
        }
      };

      await validateObject();
    })();
  }, [onBeforeSubmit, open]);

  const isSubmitNotAllowed = kubeObjectNameFieldValue !== objectName || !!errorTemplate;
  const dialogTitle = React.useMemo(
    () => getDialogTitle(errorTemplate, objectName || ''),
    [errorTemplate, objectName]
  );

  return (
    <Dialog open={open} onClose={handleClosePopup} fullWidth data-testid="dialog">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {!loadingActive && !errorTemplate && (
            <Grid item xs={12}>
              <Typography>{description}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                {!!loadingActive && (
                  <Grid container justifyContent="center">
                    <Grid item>
                      <CircularProgress />
                    </Grid>
                  </Grid>
                )}
                {!!errorTemplate && !loadingActive && (
                  <Grid item xs={12}>
                    {errorTemplate}
                  </Grid>
                )}
                {!loadingActive && !errorTemplate && (
                  <Grid item xs={12}>
                    <TextField
                      {...register(NAMES.name, { required: true })}
                      label={`Enter "${objectName}" to delete`}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <DialogActions>
                    <Button type={'button'} onClick={handleClosePopup}>
                      Cancel
                    </Button>
                    <Button type={'submit'} disabled={isSubmitNotAllowed}>
                      Confirm
                    </Button>
                  </DialogActions>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

DeleteKubeObjectDialog.displayName = DIALOG_NAME;
