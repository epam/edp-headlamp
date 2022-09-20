import { useForm } from 'react-hook-form';
import { MuiCore, React, ReactRedux } from '../../plugin.globals';
import { clusterAction } from '../../redux/actions';
import { Render } from '../Render';
import { DeleteKubeObjectProps } from './types';

const {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    TextField,
    CircularProgress,
} = MuiCore;
const { useDispatch } = ReactRedux;

const NAMES = {
    name: 'name',
};

const getErrorMessage = (name: string, error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return `Oops! Something went wrong! Couldn't delete "${name}"`;
};

export const DeleteKubeObject = ({
    popupOpen,
    setPopupOpen,
    kubeObject,
    kubeObjectData,
    objectName,
    description,
    onBeforeSubmit,
}: DeleteKubeObjectProps): React.ReactElement => {
    const [errorTemplate, setErrorTemplate] = React.useState<React.ReactNode | string>(null);
    const [loadingActive, setLoadingActive] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const { register, handleSubmit, watch } = useForm();
    const kubeObjectNameFieldValue = watch(NAMES.name);

    const handleClosePopup = React.useCallback(() => {
        setPopupOpen(false);
    }, [setPopupOpen]);

    const handleOpenPopup = React.useCallback(() => {
        setPopupOpen(true);
    }, [setPopupOpen]);

    const applyFunc = React.useCallback(async (): Promise<void> => {
        try {
            await kubeObject.apiEndpoint.delete(
                kubeObjectData.metadata.namespace,
                kubeObjectData.metadata.name
            );
        } catch (error: unknown) {
            const msg = getErrorMessage(kubeObjectData.metadata.name, error);
            setErrorTemplate(msg);
            handleOpenPopup();
            throw error;
        }
    }, [
        kubeObject,
        kubeObjectData.metadata.namespace,
        kubeObjectData.metadata.name,
        setErrorTemplate,
        handleOpenPopup,
    ]);

    const onSubmit = React.useCallback(
        ({ name }) => {
            if (errorTemplate) {
                return;
            }

            if (objectName === name) {
                handleClosePopup();
                dispatch(
                    clusterAction(applyFunc, {
                        startMessage: `Deleting "${objectName}"`,
                        cancelledMessage: `Cancelled deleting "${objectName}"`,
                        successMessage: `Deleted "${objectName}"`,
                        errorMessage: `Failed to delete "${objectName}"`,
                    })
                );
            }
        },
        [errorTemplate, objectName, handleClosePopup, dispatch, applyFunc]
    );

    React.useEffect(() => {
        const validateObject = async () => {
            if (onBeforeSubmit !== undefined && popupOpen) {
                await onBeforeSubmit(setErrorTemplate, setLoadingActive);
            }
        };

        validateObject();
    }, [onBeforeSubmit, popupOpen]);

    const dialogTitle = !errorTemplate
        ? `Confirm deletion of "${objectName}"`
        : `Cannot start deleting "${objectName}"`;
    const isSubmitNotAllowed = kubeObjectNameFieldValue !== objectName || !!errorTemplate;

    return (
        <Dialog open={popupOpen} onClose={handleClosePopup} fullWidth>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Render condition={!loadingActive}>
                        <Render condition={!errorTemplate}>
                            <Grid item xs={12}>
                                <Typography>{description}</Typography>
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
                                                label={`Enter ${kubeObjectData.kind} name to delete`}
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
