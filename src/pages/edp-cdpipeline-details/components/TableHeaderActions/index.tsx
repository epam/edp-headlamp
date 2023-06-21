import { CreateCDPipelineStage } from '../../../../components/CreateCDPipelineStage';
import { useCreateCDPipelineStage } from '../../../../components/CreateCDPipelineStage/hooks/useCreateCDPipelineStage';
import { Render } from '../../../../components/Render';
import { ICONS } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { useCDPipelineContext } from '../../providers/CDPipeline/hooks';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;

export const TableHeaderActions = ({ CDPipelineStages }: TableHeaderActionsProps) => {
    const { CDPipeline } = useCDPipelineContext();
    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const onClose = React.useCallback(
        (_?, reason?: string) => {
            if (reason === 'backdropClick') {
                return;
            }

            setCreateDialogOpen(false);
        },
        [setCreateDialogOpen]
    );

    const {
        createCDPipelineStage,
        mutations: { CDPipelineStageCreateMutation },
    } = useCreateCDPipelineStage({
        onSuccess: () => {
            setCreateDialogOpen(false);
        },
        onError: () => {
            setCreateDialogOpen(true);
        },
    });

    return (
        <>
            <Tooltip title={'Create stage'}>
                <Button
                    startIcon={<Icon icon={ICONS['DOCUMENT_ADD']} />}
                    onClick={() => setCreateDialogOpen(true)}
                >
                    <Typography>Create</Typography>
                </Button>
            </Tooltip>
            <Render condition={!!CDPipeline}>
                <CreateCDPipelineStage
                    CDPipelineData={CDPipeline}
                    otherStages={CDPipelineStages}
                    open={createDialogOpen}
                    onClose={onClose}
                    setOpen={setCreateDialogOpen}
                    handleApply={createCDPipelineStage}
                    isApplying={CDPipelineStageCreateMutation.isLoading}
                />
            </Render>
        </>
    );
};
