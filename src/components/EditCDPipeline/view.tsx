import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { MuiCore, React, ReactRedux } from '../../plugin.globals';
import { clusterAction } from '../../redux/actions';
import { DeepPartial } from '../../types/global';
import { EditCDPipelineForm } from './components/EditCDPipelineForm';
import { useEditCDPipeline } from './hooks/useEditCDPipeline';
import { useStyles } from './styles';
import { EditCDPipelineProps } from './types';

const { Dialog, DialogContent, Typography } = MuiCore;
const { useDispatch } = ReactRedux;

export const EditCDPipeline = ({
    open,
    onClose,
    setOpen,
    CDPipelineData,
}: EditCDPipelineProps): React.ReactElement => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { editCDPipeline } = useEditCDPipeline(
        () => setOpen(false),
        () => setOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>
        ): Promise<EDPCDPipelineKubeObjectInterface | undefined> =>
            editCDPipeline(newCDPipelineData),
        [editCDPipeline]
    );
    const handleApply = React.useCallback(
        async (newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>): Promise<void> => {
            const {
                metadata: { name },
            } = newCDPipelineData;
            const cancelUrl = location.pathname;

            dispatch(
                clusterAction(() => applyFunc(newCDPipelineData), {
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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={'md'}>
            <div className={classes.dialog} data-testid={'edit-cdpipeline'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Edit ${CDPipelineData.metadata.name}`}</Typography>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <EditCDPipelineForm
                        handleApply={handleApply}
                        setDialogOpen={setOpen}
                        CDPipelineData={CDPipelineData}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
