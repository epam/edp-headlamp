import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { MuiCore, React, ReactRedux } from '../../plugin.globals';
import { clusterAction } from '../../redux/actions';
import { DeepPartial } from '../../types/global';
import { EditCDPipelineStageForm } from './components/EditCDPipelineStageForm';
import { useEditCDPipelineStage } from './hooks/useEditCDPipelineStage';
import { useStyles } from './styles';
import { EditCodebaseProps } from './types';

const { Dialog, DialogContent, Typography } = MuiCore;
const { useDispatch } = ReactRedux;

export const EditCDPipelineStage = ({
    open,
    onClose,
    setOpen,
    CDPipelineStageData,
}: EditCodebaseProps): React.ReactElement => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { editCDPipelineStage } = useEditCDPipelineStage(
        () => setOpen(false),
        () => setOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<EDPCDPipelineStageKubeObjectInterface | undefined> =>
            editCDPipelineStage(newCDPipelineStageData),
        [editCDPipelineStage]
    );
    const handleApply = React.useCallback(
        async (
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<void> => {
            const {
                metadata: { name },
            } = newCDPipelineStageData;
            const cancelUrl = location.pathname;

            dispatch(
                clusterAction(() => applyFunc(newCDPipelineStageData), {
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
        <Dialog open={open} onClose={onClose} fullWidth>
            <div className={classes.dialog} data-testid={'edit-cdpipeline-stage'}>
                <div className={classes.dialogTitle}>
                    <Typography
                        variant={'h5'}
                    >{`Edit ${CDPipelineStageData.metadata.name}`}</Typography>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <EditCDPipelineStageForm
                        handleApply={handleApply}
                        setDialogOpen={setOpen}
                        CDPipelineStageData={CDPipelineStageData}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
