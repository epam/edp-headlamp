import { URL_EDP_HEADLAMP_USER_GUIDE_APPLICATION_EDIT } from '../../constants/urls';
import { MuiCore, React } from '../../plugin.globals';
import { DocLink } from '../DocLink';
import { EditCodebaseForm } from './components/EditCodebaseForm';
import { useEditCodebase } from './hooks/useEditCodebase';
import { useStyles } from './styles';
import { EditCodebaseProps } from './types';

const { Dialog, DialogContent, Typography, Grid } = MuiCore;

export const EditCodebase = ({ open, onClose, setOpen, codebaseData }: EditCodebaseProps) => {
    const classes = useStyles();

    const { editCodebase } = useEditCodebase({
        onSuccess: () => setOpen(false),
        onError: () => setOpen(true),
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
            <div className={classes.dialog} data-testid={'edit-codebase'}>
                <div className={classes.dialogTitle}>
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography
                                variant={'h5'}
                            >{`Edit ${codebaseData.metadata.name}`}</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_APPLICATION_EDIT} />
                        </Grid>
                    </Grid>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <EditCodebaseForm
                        handleApply={editCodebase}
                        setDialogOpen={setOpen}
                        codebaseData={codebaseData}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
