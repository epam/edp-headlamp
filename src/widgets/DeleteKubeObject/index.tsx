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
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Render } from '../../components/Render';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from './constants';
import { useDeleteKubeObject } from './hooks/useDeleteKubeObject';
import { DeleteKubeObjectDialogForwardedProps } from './types';

const NAMES = {
    name: 'name',
};

const getDialogTitle = (errorTemplate: React.ReactNode, objectName: string): string =>
    !errorTemplate
        ? `Confirm deletion of "${objectName}"`
        : `Cannot start deleting "${objectName}"`;

export const DeleteKubeObject = () => {
    const { dialogProviderState, closeDialog, openDialog } =
        useDialogContext<DeleteKubeObjectDialogForwardedProps>();
    const dialog = dialogProviderState?.[DELETE_KUBE_OBJECT_DIALOG_NAME];

    const [errorTemplate, setErrorTemplate] = React.useState<React.ReactNode | string>(null);
    const [loadingActive, setLoadingActive] = React.useState<boolean>(false);
    const { register, handleSubmit, watch, reset } = useForm();
    const kubeObjectNameFieldValue = watch(NAMES.name);

    const handleClosePopup = React.useCallback(
        (_?, reason?: string) =>
            reason !== 'backdropClick' ? closeDialog(DELETE_KUBE_OBJECT_DIALOG_NAME) : false,
        [closeDialog]
    );

    const handleOpenPopup = React.useCallback(() => {
        openDialog(DELETE_KUBE_OBJECT_DIALOG_NAME);
    }, [openDialog]);

    const { deleteKubeObject } = useDeleteKubeObject({
        onSuccess: dialog?.forwardedProps?.onSuccess,
        onError: handleOpenPopup,
    });

    const objectName = dialog.forwardedProps?.objectName;
    const kubeObjectData = dialog.forwardedProps?.kubeObjectData;
    const onBeforeSubmit = dialog.forwardedProps?.onBeforeSubmit;

    const onSubmit = React.useCallback(
        async ({ name }) => {
            if (errorTemplate || objectName !== name) {
                return;
            }

            handleClosePopup();
            await deleteKubeObject({
                kubeObject: dialog.forwardedProps?.kubeObject,
                kubeObjectData: dialog.forwardedProps?.kubeObjectData,
            });
            reset();
        },
        [errorTemplate, objectName, handleClosePopup, deleteKubeObject, dialog, reset]
    );

    React.useEffect(() => {
        (async () => {
            const validateObject = async () => {
                if (onBeforeSubmit !== undefined && dialog.open) {
                    await onBeforeSubmit(setErrorTemplate, setLoadingActive);
                }
            };

            await validateObject();
        })();
    }, [onBeforeSubmit, dialog.open]);

    const isSubmitNotAllowed = kubeObjectNameFieldValue !== objectName || !!errorTemplate;
    const dialogTitle = React.useMemo(
        () => getDialogTitle(errorTemplate, objectName),
        [errorTemplate, objectName]
    );

    return (
        <Dialog open={dialog.open} onClose={handleClosePopup} fullWidth>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Render condition={!loadingActive}>
                        <Render condition={!errorTemplate}>
                            <Grid item xs={12}>
                                <Typography>{dialog.forwardedProps?.description}</Typography>
                            </Grid>
                        </Render>
                    </Render>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={1}>
                                <Render condition={!!loadingActive}>
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <CircularProgress />
                                        </Grid>
                                    </Grid>
                                </Render>
                                <Render condition={!!errorTemplate && !loadingActive}>
                                    <Grid item xs={12}>
                                        {errorTemplate}
                                    </Grid>
                                </Render>
                                <Render condition={!loadingActive}>
                                    <Render condition={!errorTemplate}>
                                        <Grid item xs={12}>
                                            <TextField
                                                {...register(NAMES.name, { required: true })}
                                                label={`Enter ${kubeObjectData?.kind} name to delete`}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Render>
                                </Render>
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
