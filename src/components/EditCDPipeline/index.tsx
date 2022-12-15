import { useRequest } from '../../hooks/useRequest';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { MuiCore, React } from '../../plugin.globals';
import { DeepPartial } from '../../types/global';
import { EditCDPipelineForm } from './components/EditCDPipelineForm';
import { useEditCDPipeline } from './hooks/useEditCDPipeline';
import { useStyles } from './styles';
import { EditCDPipelineProps } from './types';

const { Dialog, DialogContent, Typography } = MuiCore;

export const EditCDPipeline = ({
    open,
    onClose,
    setOpen,
    CDPipelineData,
}: EditCDPipelineProps): React.ReactElement => {
    const classes = useStyles();

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

    const { fireRequest } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'edit',
        },
    });

    const handleApply = React.useCallback(
        async (newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>): Promise<void> => {
            await fireRequest({
                objectName: newCDPipelineData.metadata.name,
                args: [newCDPipelineData],
            });
        },
        [fireRequest]
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
