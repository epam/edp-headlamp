import { ICON_PENCIL } from '../../constants/icons';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { Iconify, MuiCore, React, ReactRedux } from '../../plugin.globals';
import { clusterAction } from '../../redux/actions';
import { DeepPartial } from '../../types/global';
import { CreateCDPipelineForm } from './components/CreateCDPipelineForm';
import { useCreateCDPipeline } from './hooks/useCreateCDPipeline';
import { useStyles } from './styles';
import { CreateCDPipelineProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;
const { useDispatch } = ReactRedux;

export const CreateCDPipeline = ({
    open,
    setOpen,
    onClose,
}: CreateCDPipelineProps): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const { createCDPipeline } = useCreateCDPipeline(
        () => setOpen(false),
        () => setOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
            stages: EDPCDPipelineStageKubeObjectInterface[]
        ): Promise<EDPCDPipelineKubeObjectInterface | undefined> =>
            createCDPipeline(newCDPipelineData, stages),
        [createCDPipeline]
    );
    const handleApply = React.useCallback(
        async (
            newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
            stages: EDPCDPipelineStageKubeObjectInterface[]
        ): Promise<void> => {
            const {
                metadata: { name },
            } = newCDPipelineData;
            const cancelUrl = location.pathname;

            dispatch(
                clusterAction(() => applyFunc(newCDPipelineData, stages), {
                    startMessage: `Applying ${name}`,
                    cancelledMessage: `Cancelled applying ${name}`,
                    successMessage: `Applied ${name}`,
                    errorMessage: `Failed to apply ${name}`,
                    cancelUrl,
                })
            );
        },
        [applyFunc, dispatch]
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={'md'}
            fullWidth
            className={classes.dialogRoot}
        >
            <div className={classes.dialog} data-testid={'create-cdpipeline'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create CD Pipeline`}</Typography>
                    <Button
                        startIcon={<Icon icon={ICON_PENCIL} />}
                        size="small"
                        component={'button'}
                        onClick={() => setEditorOpen(true)}
                    >
                        Edit YAML
                    </Button>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <CreateCDPipelineForm
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        handleApply={handleApply}
                        setDialogOpen={setOpen}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
