import { ICONS } from '../../constants/icons';
import { URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVER_ADD } from '../../constants/urls';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { DocLink } from '../DocLink';
import { CreateGitServerForm } from './components/CreateGitServerForm';
import { useCreateGitServer } from './hooks/useCreateGitServer';
import { useStyles } from './styles';
import { CreateGitServerProps } from './types';

const { Dialog, DialogContent, Typography, Button, Grid } = MuiCore;
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
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography variant={'h5'}>Create Git Server</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink
                                title={'Git Server Creation Doc'}
                                href={URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVER_ADD}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        startIcon={<Icon icon={ICONS['PENCIL']} />}
                        size="small"
                        component={'button'}
                        onClick={() => setEditorOpen(true)}
                        style={{ flexShrink: 0 }}
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
