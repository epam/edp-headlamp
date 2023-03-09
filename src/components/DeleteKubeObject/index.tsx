import { useForm } from 'react-hook-form';
import { MuiCore, React } from '../../plugin.globals';
import { Render } from '../Render';
import { useDeleteKubeObject } from './hooks/useDeleteKubeObject';
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

const getDialogTitle = (errorTemplate: React.ReactNode, objectName: string): string =>
    !errorTemplate
        ? `Confirm deletion of "${objectName}"`
        : `Cannot start deleting "${objectName}"`;

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

    const handleClosePopup = React.useCallback(
        (_?, reason?: string) => (reason !== 'backdropClick' ? setPopupOpen(false) : false),
        [setPopupOpen]
    );

    const handleOpenPopup = React.useCallback(() => {
        setPopupOpen(true);
    }, [setPopupOpen]);

    const { deleteKubeObject } = useDeleteKubeObject({
        onSuccess: onSuccess,
        onError: handleOpenPopup,
    });

    const onSubmit = React.useCallback(
        async ({ name }) => {
            if (errorTemplate || objectName !== name) {
                return;
            }

            handleClosePopup();
            await deleteKubeObject({ kubeObject, kubeObjectData });
            reset();
        },
        [
            errorTemplate,
            objectName,
            handleClosePopup,
            deleteKubeObject,
            kubeObject,
            kubeObjectData,
            reset,
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

    const isSubmitNotAllowed = kubeObjectNameFieldValue !== objectName || !!errorTemplate;
    const dialogTitle = React.useMemo(
        () => getDialogTitle(errorTemplate, objectName),
        [errorTemplate, objectName]
    );

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
