import { CDPipelineActionsMenu } from '../../../../components/CDPipelineActionsMenu';
import { ICONS } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { CDPipelineActionsProps } from './types';

const { Icon } = Iconify;
const { IconButton, Tooltip } = MuiCore;

export const CDPipelineActions = ({ CDPipeline }: CDPipelineActionsProps) => {
    const { handleOpenResourceActionListMenu } = useResourceActionListContext();
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
