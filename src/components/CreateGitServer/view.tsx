import { ICONS } from '../../constants/icons';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { Iconify, MuiCore, React, ReactRedux } from '../../plugin.globals';
import { clusterAction } from '../../redux/actions';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { CreateGitServerForm } from './components/CreateGitServerForm';
import { useCreateGitServer } from './hooks/useCreateGitServer';
import { useStyles } from './styles';
import { CreateGitServerProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;
const { useDispatch } = ReactRedux;

export const CreateGitServer = ({
    createDialogOpen,
    onClose,
    isApplying,
    setCreateDialogOpen,
    setIsApplying,
}: CreateGitServerProps): React.ReactElement => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const { createGitServer } = useCreateGitServer(
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
            gitServerData: DeepPartial<EDPGitServerKubeObjectInterface>,
            gitServerSecretData: DeepPartial<EDPKubeObjectInterface>
        ): Promise<DeepPartial<EDPGitServerKubeObjectInterface>> =>
            createGitServer(gitServerData, gitServerSecretData),
        [createGitServer]
    );
    const handleApply = React.useCallback(
        async (
            gitServerData: DeepPartial<EDPGitServerKubeObjectInterface>,
            gitServerSecretData: DeepPartial<EDPKubeObjectInterface>
        ): Promise<void> => {
            const {
                metadata: { name },
            } = gitServerData;
            const cancelUrl = location.pathname;

            setIsApplying(true);

            dispatch(
                clusterAction(() => applyFunc(gitServerData, gitServerSecretData), {
                    startMessage: `Applying ${name}`,
                    cancelledMessage: `Cancelled applying ${name}`,
                    successMessage: `Applied ${name}`,
                    errorMessage: `Failed to apply ${name}`,
                    cancelUrl,
                })
            );

            // temporary solution, since we cannot pass any callbacks for action cancelling
            setTimeout(() => setIsApplying(false), 3000);
        },
        [applyFunc, dispatch, setIsApplying]
    );

    return (
        <Dialog
            open={createDialogOpen}
            onClose={onClose}
            fullWidth
            maxWidth={'md'}
            className={classes.dialogRoot}
        >
            <div className={classes.dialog} data-testid={'create-git-server'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create Git Server`}</Typography>
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
                    <CreateGitServerForm
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
