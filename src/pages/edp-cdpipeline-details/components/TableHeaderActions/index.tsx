import { Icon } from '@iconify/react';
import { Button, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useCreateCDPipelineStage } from '../../../../k8s/EDPCDPipelineStage/hooks/useCreateCDPipelineStage';
import { CreateCDPipelineStage } from '../../../../widgets/CreateCDPipelineStage';
import { useCDPipelineContext } from '../../providers/CDPipeline/hooks';
import { TableHeaderActionsProps } from './types';

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
