import { URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINE_EDIT } from '../../constants/urls';
import { MuiCore, React } from '../../plugin.globals';
import { DocLink } from '../DocLink';
import { EditCDPipelineForm } from './components/EditCDPipelineForm';
import { useEditCDPipeline } from './hooks/useEditCDPipeline';
import { useStyles } from './styles';
import { EditCDPipelineProps } from './types';

const { Dialog, DialogContent, Typography, Grid } = MuiCore;

export const EditCDPipeline = ({
    open,
    onClose,
    setOpen,
    CDPipelineData,
}: EditCDPipelineProps): React.ReactElement => {
    const classes = useStyles();

    const { editCDPipeline } = useEditCDPipeline({
        onSuccess: () => setOpen(false),
        onError: () => setOpen(true),
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
            <div className={classes.dialog} data-testid={'edit-cdpipeline'}>
                <div className={classes.dialogTitle}>
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography
                                variant={'h5'}
                            >{`Edit ${CDPipelineData.metadata.name}`}</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINE_EDIT} />
                        </Grid>
                    </Grid>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <EditCDPipelineForm
                        handleApply={editCDPipeline}
                        setDialogOpen={setOpen}
                        CDPipelineData={CDPipelineData}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
