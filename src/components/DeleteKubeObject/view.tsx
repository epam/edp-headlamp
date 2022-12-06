import { useForm } from 'react-hook-form';
import { useRequest } from '../../hooks/useRequest';
import { MuiCore, React } from '../../plugin.globals';
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
    onSuccess,
}: DeleteKubeObjectProps): React.ReactElement => {
    const [errorTemplate, setErrorTemplate] = React.useState<React.ReactNode | string>(null);
    const [loadingActive, setLoadingActive] = React.useState<boolean>(false);
    const { register, handleSubmit, watch, reset } = useForm();
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

            if (!onSuccess) {
                return;
            }

            onSuccess();
        } catch (error: unknown) {
            const msg = getErrorMessage(kubeObjectData.metadata.name, error);
            setErrorTemplate(msg);
            handleOpenPopup();
            throw error;
        }
    }, [kubeObject, kubeObjectData, onSuccess, handleOpenPopup]);

    const { fireRequest } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'delete',
        },
    });

    const onSubmit = React.useCallback(
        async ({ name }) => {
            if (errorTemplate) {
                return;
            }

            if (objectName === name) {
                handleClosePopup();
                await fireRequest({ objectName: kubeObjectData.metadata.name });
            }

            reset();
        },
        [
            errorTemplate,
            objectName,
            reset,
            handleClosePopup,
            fireRequest,
            kubeObjectData.metadata.name,
        ]
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
