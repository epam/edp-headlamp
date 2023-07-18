import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { CDPipelineActionsMenu } from '../../../../widgets/CDPipelineActionsMenu';
import { CDPipelineActionsProps } from './types';

export const CDPipelineActions = ({ CDPipeline }: CDPipelineActionsProps) => {
    const { handleOpenResourceActionListMenu } =
        useResourceActionListContext<EDPCDPipelineKubeObjectInterface>();
    const buttonRef = React.createRef<HTMLButtonElement>();

    return (
        <>
            <Tooltip title={'Actions'}>
                <IconButton
                    aria-label={'Actions'}
                    ref={buttonRef}
                    onClick={() =>
                        handleOpenResourceActionListMenu(buttonRef.current, CDPipeline, true)
                    }
                >
                    <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                </IconButton>
            </Tooltip>
            <CDPipelineActionsMenu />
        </>
    );
};
