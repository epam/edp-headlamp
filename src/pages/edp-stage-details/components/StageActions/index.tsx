import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Render } from '../../../../components/Render';
import { StageActionsMenu } from '../../../../components/StageActionsMenu';
import { ICONS } from '../../../../constants/icons';
import { React } from '../../../../plugin.globals';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { useCDPipelineStagesQueryContext } from '../../providers/CDPipelineStagesQuery/hooks';
import { StageActionsProps } from './types';

export const StageActions = ({ stage }: StageActionsProps) => {
    const { stagesQuery } = useCDPipelineStagesQueryContext();
    const { handleOpenResourceActionListMenu } = useResourceActionListContext();
    const buttonRef = React.createRef<HTMLButtonElement>();

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
                <StageActionsMenu stages={stagesQuery.data?.items} />
            </Render>
        </>
    );
};
