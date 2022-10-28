import { CreateCDPipelineStage } from '../../../../../../components/CreateCDPipelineStage';
import { useCreateCDPipelineStage } from '../../../../../../components/CreateCDPipelineStage/hooks/useCreateCDPipelineStage';
import { DELAYS } from '../../../../../../constants/delays';
import { ICONS } from '../../../../../../constants/icons';
import { useAvailableCITools } from '../../../../../../hooks/useAvailableCITools';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';
import { Iconify, MuiCore, React, ReactRedux } from '../../../../../../plugin.globals';
import { clusterAction } from '../../../../../../redux/actions';
import { DeepPartial } from '../../../../../../types/global';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;
const { useDispatch } = ReactRedux;

export const TableHeaderActions = ({
    CDPipelineData,
    currentCDPipelineStages,
}: TableHeaderActionsProps): React.ReactElement => {
    const dispatch = useDispatch();

    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const onClose = React.useCallback(() => {
        setCreateDialogOpen(false);
    }, [setCreateDialogOpen]);

    const [isApplying, setIsApplying] = React.useState<boolean>(false);

    const { createCDPipelineStage } = useCreateCDPipelineStage(
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
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<DeepPartial<EDPCDPipelineStageKubeObjectInterface> | undefined> =>
            createCDPipelineStage(newCDPipelineStageData),
        [createCDPipelineStage]
    );
    const handleApply = React.useCallback(
        async (
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<void> => {
            const {
                metadata: { name },
            } = newCDPipelineStageData;
            const cancelUrl = location.pathname;

            setIsApplying(true);

            dispatch(
                clusterAction(() => applyFunc(newCDPipelineStageData), {
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
        [applyFunc, dispatch]
    );

    const { availableCITools } = useAvailableCITools({
        namespace: CDPipelineData.metadata.namespace,
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
            <CreateCDPipelineStage
                availableCITools={availableCITools}
                CDPipelineData={CDPipelineData}
                stagesQuantity={currentCDPipelineStages.length}
                open={createDialogOpen}
                onClose={onClose}
                setOpen={setCreateDialogOpen}
                handleApply={handleApply}
                isApplying={isApplying}
            />
        </>
    );
};
