import { ICONS } from '../../constants/icons';
import { useRequest } from '../../hooks/useRequest';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { DeepPartial } from '../../types/global';
import { CreateCDPipelineForm } from './components/CreateCDPipelineForm';
import { useCreateCDPipeline } from './hooks/useCreateCDPipeline';
import { useStyles } from './styles';
import { CreateCDPipelineProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const CreateCDPipeline = ({
    createDialogOpen,
    onClose,
    setCreateDialogOpen,
}: CreateCDPipelineProps): React.ReactElement => {
    const classes = useStyles();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const { createCDPipeline } = useCreateCDPipeline(
        () => {
            setCreateDialogOpen(false);
        },
        () => {
            setCreateDialogOpen(true);
        }
    );

    const applyFunc = React.useCallback(
        async (
            newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
            stages: EDPCDPipelineStageKubeObjectInterface[]
        ): Promise<DeepPartial<EDPCDPipelineKubeObjectInterface> | undefined> =>
            createCDPipeline(newCDPipelineData, stages),
        [createCDPipeline]
    );

    const {
        state: { isLoading },
        fireRequest,
    } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'create',
        },
    });

    const handleApply = React.useCallback(
        async (
            newCDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
            stages: EDPCDPipelineStageKubeObjectInterface[]
        ): Promise<void> => {
            await fireRequest({
                objectName: newCDPipelineData.metadata.name,
                args: [newCDPipelineData, stages],
            });
        },
        [fireRequest]
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
                        isApplying={isLoading}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
