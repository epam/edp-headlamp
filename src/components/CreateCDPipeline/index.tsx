import { ICONS } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { CreateCDPipelineForm } from './components/CreateCDPipelineForm';
import { useCreateCDPipeline } from './hooks/useCreateCDPipeline';
import { useStyles } from './styles';
import { CreateCDPipelineProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const CreateCDPipeline = ({
    createDialogOpen,
    onClose,
    setCreateDialogOpen,
}: CreateCDPipelineProps): React.ReactElement => {
    const classes = useStyles();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const {
        createCDPipeline,
        mutations: {
            CDPipelineCreateMutation,
            CDPipelineStageCreateMutation,
            CDPipelineDeleteMutation,
            CDPipelineStageDeleteMutation,
        },
    } = useCreateCDPipeline({
        onSuccess: () => {
            setCreateDialogOpen(false);
        },
        onError: () => {
            setCreateDialogOpen(true);
        },
    });

    return (
        <Dialog
            open={createDialogOpen}
            onClose={onClose}
            maxWidth={'md'}
            fullWidth
            className={classes.dialogRoot}
        >
            <div className={classes.dialog} data-testid={'create-cdpipeline'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create CD Pipeline`}</Typography>
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
                    <CreateCDPipelineForm
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        handleApply={createCDPipeline}
                        setDialogOpen={setCreateDialogOpen}
                        isApplying={
                            CDPipelineCreateMutation.isLoading ||
                            CDPipelineDeleteMutation.isLoading ||
                            CDPipelineStageCreateMutation.isLoading ||
                            CDPipelineStageDeleteMutation.isLoading
                        }
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
