import { ICON_PENCIL } from '../../constants/icons';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { Iconify, MuiCore, React, ReactRedux } from '../../plugin.globals';
import { clusterAction } from '../../redux/actions';
import { CreateCodebaseBranchForm } from './components/CreateCodebaseBranchForm';
import { useCreateCodebaseBranch } from './hooks/useCreateCodebaseBranch';
import { useStyles } from './styles';
import { CreateCodebaseBranchProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;
const { useDispatch } = ReactRedux;

export const CreateCodebaseBranch = ({
    codebaseData,
    open,
    setOpen,
    onClose,
}: CreateCodebaseBranchProps): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const { createCodebaseBranch } = useCreateCodebaseBranch(
        () => setOpen(false),
        () => setOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface
        ): Promise<EDPCodebaseBranchKubeObjectInterface | undefined> =>
            createCodebaseBranch(newCodebaseBranchData),
        [createCodebaseBranch]
    );
    const handleApply = React.useCallback(
        async (newCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface): Promise<void> => {
            const cancelUrl = location.pathname;
            const {
                spec: { branchName },
            } = newCodebaseBranchData;

            dispatch(
                clusterAction(() => applyFunc(newCodebaseBranchData), {
                    startMessage: `Applying ${branchName}`,
                    cancelledMessage: `Cancelled applying ${branchName}`,
                    successMessage: `Applied ${branchName}`,
                    errorMessage: `Failed to apply ${branchName}`,
                    cancelUrl,
                })
            );
        },
        [applyFunc, dispatch]
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth className={classes.dialogRoot}>
            <div className={classes.dialog} data-testid={'create-codebase-branch'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create new branch`}</Typography>
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
                    <CreateCodebaseBranchForm
                        codebaseData={codebaseData}
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
