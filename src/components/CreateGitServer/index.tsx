import { ICONS } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
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

    const {
        createGitServer,
        mutations: {
            gitServerCreateMutation,
            gitServerSecretCreateMutation,
            gitServerSecretDeleteMutation,
        },
    } = useCreateGitServer({
        onSuccess: () => setCreateDialogOpen(false),
        onError: () => setCreateDialogOpen(true),
    });

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
                        handleApply={createGitServer}
                        setDialogOpen={setCreateDialogOpen}
                        isApplying={
                            gitServerCreateMutation.isLoading ||
                            gitServerSecretCreateMutation.isLoading ||
                            gitServerSecretDeleteMutation.isLoading
                        }
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
