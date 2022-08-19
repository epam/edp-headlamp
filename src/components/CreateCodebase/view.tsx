import { ICON_PENCIL } from '../../constants/icons';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, React, ReactRedux } from '../../plugin.globals';
import { clusterAction } from '../../redux/actions';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { CreateCodebaseForm } from './components/CreateCodebaseForm';
import { useCreateCodebase } from './hooks/useCreateCodebase';
import { useStyles } from './styles';
import { CodebaseAuthData, CreateCodebaseProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;
const { useDispatch } = ReactRedux;

export const CreateCodebase = ({
    type,
    open,
    setOpen,
    onClose,
}: CreateCodebaseProps): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const { createCodebase } = useCreateCodebase(
        () => setOpen(false),
        () => setOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCodebaseData: EDPKubeObjectInterface,
            codebaseAuthData: CodebaseAuthData | null
        ): Promise<EDPCodebaseKubeObjectInterface | undefined> =>
            createCodebase(newCodebaseData, codebaseAuthData),
        [createCodebase]
    );
    const handleApply = React.useCallback(
        async (
            newCodebaseData: EDPKubeObjectInterface,
            codebaseAuthData: CodebaseAuthData | null
        ): Promise<void> => {
            const {
                metadata: { name },
            } = newCodebaseData;
            const cancelUrl = location.pathname;

            dispatch(
                clusterAction(() => applyFunc(newCodebaseData, codebaseAuthData), {
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
