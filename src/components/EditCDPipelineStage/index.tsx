import { MuiCore, React } from '../../plugin.globals';
import { EditCDPipelineStageForm } from './components/EditCDPipelineStageForm';
import { useEditCDPipelineStage } from './hooks/useEditCDPipelineStage';
import { useStyles } from './styles';
import { EditCodebaseProps } from './types';

const { Dialog, DialogContent, Typography } = MuiCore;

export const EditCDPipelineStage = ({
    open,
    onClose,
    setOpen,
    CDPipelineStageData,
}: EditCodebaseProps): React.ReactElement => {
    const classes = useStyles();

    const { editCDPipelineStage } = useEditCDPipelineStage({
        onSuccess: () => setOpen(false),
        onError: () => setOpen(true),
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <div className={classes.dialog} data-testid={'edit-cdpipeline-stage'}>
                <div className={classes.dialogTitle}>
                    <Typography
                        variant={'h5'}
                    >{`Edit ${CDPipelineStageData.metadata.name}`}</Typography>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <EditCDPipelineStageForm
                        handleApply={editCDPipelineStage}
                        setDialogOpen={setOpen}
                        CDPipelineStageData={CDPipelineStageData}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
