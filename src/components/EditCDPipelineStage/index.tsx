import { Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { URL_EDP_HEADLAMP_USER_GUIDE_STAGE_EDIT } from '../../constants/urls';
import { DocLink } from '../DocLink';
import { EditCDPipelineStageForm } from './components/EditCDPipelineStageForm';
import { useEditCDPipelineStage } from './hooks/useEditCDPipelineStage';
import { useStyles } from './styles';
import { EditCodebaseProps } from './types';

export const EditCDPipelineStage = ({
    open,
    onClose,
    setOpen,
    CDPipelineStageData,
}: EditCodebaseProps) => {
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
                            <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_STAGE_EDIT} />
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
