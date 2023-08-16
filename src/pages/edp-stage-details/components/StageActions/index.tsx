import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { StageActionsMenu } from '../../../../widgets/StageActionsMenu';
import { useCDPipelineQueryContext } from '../../providers/CDPipelineQuery/hooks';
import { useCDPipelineStagesQueryContext } from '../../providers/CDPipelineStagesQuery/hooks';
import { StageActionsProps } from './types';

export const StageActions = ({ stage }: StageActionsProps) => {
    const { stagesQuery } = useCDPipelineStagesQueryContext();
    const { handleOpenResourceActionListMenu } =
        useResourceActionListContext<EDPCDPipelineStageKubeObjectInterface>();
    const buttonRef = React.createRef<HTMLButtonElement>();

    const { CDPipelineQuery } = useCDPipelineQueryContext();

    return (
        <>
            <Tooltip title={'Actions'}>
                <IconButton
                    aria-label={'Actions'}
                    ref={buttonRef}
                    onClick={() => handleOpenResourceActionListMenu(buttonRef.current, stage, true)}
                >
                    <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                </IconButton>
            </Tooltip>
            <Render condition={!!stagesQuery.data}>
                <StageActionsMenu
                    stages={stagesQuery.data?.items}
                    CDPipelineData={CDPipelineQuery?.data}
                />
            </Render>
        </>
    );
};
