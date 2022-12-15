import { useRequest } from '../../hooks/useRequest';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { MuiCore, React } from '../../plugin.globals';
import { DeepPartial } from '../../types/global';
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

    const { fireRequest } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'edit',
        },
    });

    const handleApply = React.useCallback(
        async (
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<void> => {
            await fireRequest({
                objectName: newCDPipelineStageData.spec.name,
                args: [newCDPipelineStageData],
            });
        },
        [fireRequest]
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
