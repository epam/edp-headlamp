import { DELAYS } from '../../constants/delays';
import { ICONS } from '../../constants/icons';
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
    createDialogOpen,
    onClose,
    isApplying,
    setCreateDialogOpen,
    setIsApplying,
}: CreateCDPipelineProps): React.ReactElement => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const { createCDPipeline } = useCreateCDPipeline(
        () => {
            setCreateDialogOpen(false);
            setIsApplying(false);
        },
        () => {
            setCreateDialogOpen(true);
            setIsApplying(false);
        }
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

            setIsApplying(true);

            dispatch(
                clusterAction(() => applyFunc(newCDPipelineData, stages), {
                    startMessage: `Applying ${name}`,
                    cancelledMessage: `Cancelled applying ${name}`,
                    successMessage: `Applied ${name}`,
                    errorMessage: `Failed to apply ${name}`,
                    cancelUrl,
                })
            );

            // temporary solution, since we cannot pass any callbacks for action cancelling
            setTimeout(() => setIsApplying(false), DELAYS['CANCEL_ACTION_FALLBACK']);
        },
        [applyFunc, dispatch, setIsApplying]
    );

    return (
        <Dialog
            open={createDialogOpen}
            onClose={onClose}
            maxWidth={'md'}
            fullWidth
            className={classes.dialogRoot}
        >
            <div className={classes.dialog} data-testid={'create-cdpipeline'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create CD Pipeline`}</Typography>
                    <Button
                        startIcon={<Icon icon={ICONS['PENCIL']} />}
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
                        setDialogOpen={setCreateDialogOpen}
                        isApplying={isApplying}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
