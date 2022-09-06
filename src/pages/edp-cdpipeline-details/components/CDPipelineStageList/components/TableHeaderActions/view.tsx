import { CreateCDPipelineStage } from '../../../../../../components/CreateCDPipelineStage';
import { useCreateCDPipelineStage } from '../../../../../../components/CreateCDPipelineStage/hooks/useCreateCDPipelineStage';
import { ICON_DOCUMENT_ADD } from '../../../../../../constants/icons';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';
import { Iconify, MuiCore, React, ReactRedux } from '../../../../../../plugin.globals';
import { clusterAction } from '../../../../../../redux/actions';
import { DeepPartial } from '../../../../../../types/global';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;
const { useDispatch } = ReactRedux;

export const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
    CDPipelineData,
    currentCDPipelineStages,
}): React.ReactElement => {
    const dispatch = useDispatch();

    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const onClose = React.useCallback(() => {
        setCreateDialogOpen(false);
    }, [setCreateDialogOpen]);

    const { createCDPipelineStage } = useCreateCDPipelineStage(
        () => setCreateDialogOpen(false),
        () => setCreateDialogOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<EDPCDPipelineStageKubeObjectInterface | undefined> =>
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

            dispatch(
                clusterAction(() => applyFunc(newCDPipelineStageData), {
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
        <>
            <Tooltip title={'Create stage'}>
                <Button
                    startIcon={<Icon icon={ICON_DOCUMENT_ADD} />}
                    onClick={() => setCreateDialogOpen(true)}
                >
                    <Typography>Create</Typography>
                </Button>
            </Tooltip>
            <CreateCDPipelineStage
                CDPipelineData={CDPipelineData}
                stagesQuantity={currentCDPipelineStages.length}
                open={createDialogOpen}
                onClose={onClose}
                setOpen={setCreateDialogOpen}
                handleApply={handleApply}
            />
        </>
    );
};
