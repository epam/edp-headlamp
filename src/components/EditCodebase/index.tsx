import { MuiCore, React } from '../../plugin.globals';
import { EditCodebaseForm } from './components/EditCodebaseForm';
import { useEditCodebase } from './hooks/useEditCodebase';
import { useStyles } from './styles';
import { EditCodebaseProps } from './types';

const { Dialog, DialogContent, Typography } = MuiCore;

export const EditCodebase = ({
    open,
    onClose,
    setOpen,
    codebaseData,
}: EditCodebaseProps): React.ReactElement => {
    const classes = useStyles();

    const { editCodebase } = useEditCodebase({
        onSuccess: () => setOpen(false),
        onError: () => setOpen(true),
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
            <div className={classes.dialog} data-testid={'edit-codebase'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Edit ${codebaseData.metadata.name}`}</Typography>
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
