import { URL_EDP_HEADLAMP_USER_GUIDE_STAGE_EDIT } from '../../constants/urls';
import { MuiCore, React } from '../../plugin.globals';
import { DocLink } from '../DocLink';
import { EditCDPipelineStageForm } from './components/EditCDPipelineStageForm';
import { useEditCDPipelineStage } from './hooks/useEditCDPipelineStage';
import { useStyles } from './styles';
import { EditCodebaseProps } from './types';

const { Dialog, DialogContent, Typography, Grid } = MuiCore;

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
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography
                                variant={'h5'}
                            >{`Edit ${CDPipelineStageData.metadata.name}`}</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink
                                title={'CD Pipeline Stage Edit Creation Doc'}
                                href={URL_EDP_HEADLAMP_USER_GUIDE_STAGE_EDIT}
                            />
                        </Grid>
                    </Grid>
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
