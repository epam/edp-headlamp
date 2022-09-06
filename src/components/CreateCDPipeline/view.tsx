import { ICON_PENCIL } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { CreateCDPipelineForm } from './components/CreateCDPipelineForm';
import { useStyles } from './styles';
import { CreateCDPipelineProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const CreateCDPipeline = ({
    open,
    setOpen,
    onClose,
    handleApply,
}: CreateCDPipelineProps): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={'md'}
            fullWidth
            className={classes.dialogRoot}
        >
            <div className={classes.dialog} data-testid={'create-cdpipeline'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create CD Pipeline`}</Typography>
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
                    <CreateCDPipelineForm
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
