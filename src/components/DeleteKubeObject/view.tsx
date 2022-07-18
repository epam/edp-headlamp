import { useForm } from 'react-hook-form';
import { clusterAction } from '../../redux/actions';
import { DeleteKubeObjectProps } from './types';

const {
    pluginLib: { React, ReactRedux, MuiCore },
} = globalThis;
const { Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField } =
    MuiCore;
const { useDispatch } = ReactRedux;

export const DeleteKubeObject: React.FC<DeleteKubeObjectProps> = ({
    popupOpen,
    setPopupOpen,
    kubeObject,
    kubeObjectData,
    description,
}): React.ReactElement => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const dispatch = useDispatch();
    const { register, handleSubmit, watch } = useForm();
    const kubeObjectNameFieldValue = watch('name');

    const applyFunc = async (): Promise<void> => {
        try {
            setPopupOpen(false);
            await kubeObject.apiEndpoint.delete(
                kubeObjectData.metadata.namespace,
                kubeObjectData.metadata.name
            );
        } catch (err) {
            let msg = 'Something went wrong…';
            if (err instanceof Error) {
                msg = err.message;
            }
            setErrorMessage(msg);
            setPopupOpen(true);
            throw err;
        }
    };

    const onSubmit = React.useCallback(
        ({ name }) => {
            const objectName = kubeObjectData.metadata.name;

            if (objectName === name) {
                dispatch(
                    clusterAction(() => applyFunc(), {
                        startMessage: `Deleting ${objectName}`,
                        cancelledMessage: `Cancelled deleting ${objectName}`,
                        successMessage: `Deleted ${objectName}`,
                        errorMessage: `Failed to delete ${objectName}`,
                    })
                );
            }
        },
        [kubeObjectData, dispatch, clusterAction, applyFunc]
    );

    return (
        <Dialog open={popupOpen}>
            <DialogTitle>{`Confirm deletion of ${kubeObjectData.metadata.name}`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography>{description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register('name', { required: true })}
                                        label={`Enter ${kubeObjectData.kind} name to delete`}
                                        variant="filled"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography hidden={!errorMessage} color={'error'}>
                                        {errorMessage}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <DialogActions>
                                        <Button type={'button'} onClick={() => setPopupOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            type={'submit'}
                                            disabled={
                                                kubeObjectNameFieldValue !==
                                                    kubeObjectData.metadata.name || errorMessage
                                            }
                                        >
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
