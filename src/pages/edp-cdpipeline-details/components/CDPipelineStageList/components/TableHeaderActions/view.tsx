import { CreateCDPipelineStage } from '../../../../../../components/CreateCDPipelineStage';
import { useCreateCDPipelineStage } from '../../../../../../components/CreateCDPipelineStage/hooks/useCreateCDPipelineStage';
import { ICONS } from '../../../../../../constants/icons';
import { useAvailableCITools } from '../../../../../../hooks/useAvailableCITools';
import { useRequest } from '../../../../../../hooks/useRequest';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../k8s/EDPCDPipelineStage/types';
import { Iconify, MuiCore, React } from '../../../../../../plugin.globals';
import { DeepPartial } from '../../../../../../types/global';
import { CDPipelineDataContext } from '../../../../view';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;

export const TableHeaderActions = ({
    CDPipelineStages,
}: TableHeaderActionsProps): React.ReactElement => {
    const CDPipelineData = React.useContext(CDPipelineDataContext);
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

    const { createCDPipelineStage } = useCreateCDPipelineStage(
        () => {
            setCreateDialogOpen(false);
        },
        () => {
            setCreateDialogOpen(true);
        }
    );

    const applyFunc = React.useCallback(
        async (
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<DeepPartial<EDPCDPipelineStageKubeObjectInterface> | undefined> =>
            createCDPipelineStage(newCDPipelineStageData),
        [createCDPipelineStage]
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
            newCDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>
        ): Promise<void> => {
            await fireRequest({
                objectName: newCDPipelineStageData.spec.name,
                args: [newCDPipelineStageData],
            });
        },
        [fireRequest]
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
                otherStages={CDPipelineStages}
                open={createDialogOpen}
                onClose={onClose}
                setOpen={setCreateDialogOpen}
                handleApply={handleApply}
                isApplying={isLoading}
            />
        </>
    );
};
