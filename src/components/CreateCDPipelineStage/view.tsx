import { ICON_PENCIL } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { CreateCDPipelineStageForm } from './components/CreateCDPipelineStageForm';
import { useStyles } from './styles';
import { CreateCDPipelineStageProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const CreateCDPipelineStage = ({
    CDPipelineData,
    stagesQuantity,
    open,
    setOpen,
    onClose,
    handleApply,
    isApplying,
}: CreateCDPipelineStageProps): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <Dialog open={open} onClose={onClose} maxWidth={'md'} className={classes.dialogRoot}>
            <div className={classes.dialog} data-testid={'create-cdpipeline-stage'}>
                <div className={classes.dialogTitle}>
                    <Typography
                        variant={'h5'}
                    >{`Create stage for "${CDPipelineData.metadata.name}"`}</Typography>
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
                    <CreateCDPipelineStageForm
                        CDPipelineData={CDPipelineData}
                        stagesQuantity={stagesQuantity}
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        setDialogOpen={setOpen}
                        handleApply={handleApply}
                        isApplying={isApplying}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
