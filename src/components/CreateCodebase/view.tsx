import { DELAYS } from '../../constants/delays';
import { ICONS } from '../../constants/icons';
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
    createDialogOpen,
    onClose,
    isApplying,
    setCreateDialogOpen,
    setIsApplying,
}: CreateCodebaseProps): React.ReactElement => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const { createCodebase } = useCreateCodebase(
        () => {
            setCreateDialogOpen(false);
            setIsApplying(false);
        },
        () => {
            setCreateDialogOpen(true);
            setIsApplying(false);
        }
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

            setIsApplying(true);

            dispatch(
                clusterAction(() => applyFunc(newCodebaseData, codebaseAuthData), {
                    startMessage: `Applying ${name}`,
                    cancelledMessage: `Cancelled applying ${name}`,
                    successMessage: `Applied ${name}`,
                    errorMessage: `Failed to apply ${name}`,
                    cancelUrl,
                })
            );

            // temporary solution, since we cannot pass any callbacks for action cancelling
            setTimeout(() => setIsApplying(false), DELAYS['CANCEL_ACTION_FALLBACK']);
        },
        [applyFunc, dispatch, setIsApplying]
    );

    return (
        <Dialog
            open={createDialogOpen}
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
                        startIcon={<Icon icon={ICONS['PENCIL']} />}
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
                        setDialogOpen={setCreateDialogOpen}
                        isApplying={isApplying}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
