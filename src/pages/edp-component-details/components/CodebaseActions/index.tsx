import { CodebaseActionsMenu } from '../../../../components/CodebaseActionsMenu';
import { ICONS } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { useResourceActionListContext } from '../../../../providers/ResourceActionList/hooks';
import { CodebaseActionsProps } from './types';

const { Icon } = Iconify;
const { IconButton, Tooltip } = MuiCore;

export const CodebaseActions = ({ codebase }: CodebaseActionsProps) => {
    const { handleOpenResourceActionListMenu } = useResourceActionListContext();
    const buttonRef = React.createRef<HTMLButtonElement>();

    return (
        <>
            <Tooltip title={'Actions'}>
                <IconButton
                    aria-label={'Actions'}
                    ref={buttonRef}
                    onClick={() =>
                        handleOpenResourceActionListMenu(buttonRef.current, codebase, true)
                    }
                >
                    <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                </IconButton>
            </Tooltip>
            <CodebaseActionsMenu />
        </>
    );
};
