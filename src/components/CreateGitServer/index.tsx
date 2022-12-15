import { ICONS } from '../../constants/icons';
import { useRequest } from '../../hooks/useRequest';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { CreateGitServerForm } from './components/CreateGitServerForm';
import { useCreateGitServer } from './hooks/useCreateGitServer';
import { useStyles } from './styles';
import { CreateGitServerProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const CreateGitServer = ({
    createDialogOpen,
    onClose,
    setCreateDialogOpen,
}: CreateGitServerProps): React.ReactElement => {
    const classes = useStyles();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const { createGitServer } = useCreateGitServer(
        () => {
            setCreateDialogOpen(false);
        },
        () => {
            setCreateDialogOpen(true);
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

    const {
        state: { isLoading },
        fireRequest,
    } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'create',
        },
    });

    const handleApply = React.useCallback(
        async (
            gitServerData: DeepPartial<EDPGitServerKubeObjectInterface>,
            gitServerSecretData: DeepPartial<EDPKubeObjectInterface>
        ): Promise<void> => {
            await fireRequest({
                objectName: gitServerData.metadata.name,
                args: [gitServerData, gitServerSecretData],
            });
        },
        [fireRequest]
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
                        isApplying={isLoading}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
