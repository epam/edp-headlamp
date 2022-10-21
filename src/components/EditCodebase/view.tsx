import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { MuiCore, React, ReactRedux } from '../../plugin.globals';
import { clusterAction } from '../../redux/actions';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { EditCodebaseForm } from './components/EditCodebaseForm';
import { useEditCodebase } from './hooks/useEditCodebase';
import { useStyles } from './styles';
import { EditCodebaseProps } from './types';

const { Dialog, DialogContent, Typography } = MuiCore;
const { useDispatch } = ReactRedux;

export const EditCodebase = ({
    open,
    onClose,
    setOpen,
    codebaseData,
}: EditCodebaseProps): React.ReactElement => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { editCodebase } = useEditCodebase(
        () => setOpen(false),
        () => setOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCodebaseData: EDPKubeObjectInterface
        ): Promise<EDPCodebaseKubeObjectInterface | undefined> => editCodebase(newCodebaseData),
        [editCodebase]
    );
    const handleApply = React.useCallback(
        async (newCodebaseData: EDPKubeObjectInterface): Promise<void> => {
            const {
                metadata: { name },
            } = newCodebaseData;
            const cancelUrl = location.pathname;

            dispatch(
                clusterAction(() => applyFunc(newCodebaseData), {
                    startMessage: `Applying changes to "${name}"`,
                    cancelledMessage: `Cancelled changes to "${name}"`,
                    successMessage: `Applied changes to "${name}"`,
                    errorMessage: `Failed to apply changes to "${name}"`,
                    cancelUrl,
                })
            );
        },
        [applyFunc, dispatch]
    );

    return (
        <Dialog open={open} onClose={onClose}>
            <div className={classes.dialog} data-testid={'edit-codebase'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Edit ${codebaseData.metadata.name}`}</Typography>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <EditCodebaseForm
                        handleApply={handleApply}
                        setDialogOpen={setOpen}
                        codebaseData={codebaseData}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
