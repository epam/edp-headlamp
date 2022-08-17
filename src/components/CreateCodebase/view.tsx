import { ICON_PENCIL } from '../../constants/icons';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { Iconify, MuiCore, Notistack, React, ReactRedux } from '../../plugin.globals';
import { k8s } from '../../plugin.types';
import { clusterAction } from '../../redux/actions';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { CreateCodebaseForm } from './components/CreateCodebaseForm';
import { useStyles } from './styles';
import { CreateCodebaseProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;
const { useDispatch } = ReactRedux;
const { useSnackbar } = Notistack;

export const CreateCodebase = ({
    type,
    open,
    setOpen,
    onClose,
}: CreateCodebaseProps): React.ReactElement => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const applyFunc = React.useCallback(
        async (newItem: k8s.cluster.KubeObjectInterface): Promise<void> => {
            try {
                await EDPCodebaseKubeObject.apiEndpoint.post(newItem);
                setOpen(false);
            } catch (err) {
                let msg = `Oops! Something went wrong! Couldn't apply ${newItem.metadata.name}`;
                if (err instanceof Error) {
                    msg = err.message;
                }
                enqueueSnackbar(msg, {
                    autoHideDuration: 10000,
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                });
                setOpen(true);
                throw err;
            }
        },
        [enqueueSnackbar, setOpen]
    );
    const handleApply = React.useCallback(
        async (data: k8s.cluster.KubeObjectInterface): Promise<void> => {
            const {
                metadata: { name },
            } = data;
            const cancelUrl = location.pathname;

            dispatch(
                clusterAction(() => applyFunc(data), {
                    startMessage: `Applying ${name}`,
                    cancelledMessage: `Cancelled applying ${name}`,
                    successMessage: `Applied ${name}`,
                    errorMessage: `Failed to apply ${name}`,
                    cancelUrl,
                })
            );
        },
        [applyFunc, dispatch]
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={'md'}
            fullWidth
            className={classes.dialogRoot}
        >
            <div className={classes.dialog} data-testid={'create-codebase'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create ${capitalizeFirstLetter(
                        type
                    )}`}</Typography>
                    <Button
                        startIcon={<Icon icon={ICON_PENCIL} />}
                        size="small"
                        component={'button'}
                        onClick={() => setEditorOpen(true)}
                    >
                        Edit YAML
                    </Button>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <CreateCodebaseForm
                        type={type}
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        handleApply={handleApply}
                        setDialogOpen={setOpen}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
