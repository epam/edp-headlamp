import { Iconify, MuiCore, React } from '../../plugin.globals';
import { KubeObjectAction } from '../../types/actions';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { Render } from '../Render';
import { useStyles } from './styles';
import { KubeObjectActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Popper, ListItem, ListItemIcon, ListItemText, ClickAwayListener } = MuiCore;

type ActionsListProps = {
    actions: KubeObjectAction[];
    menuOpen: boolean;
    handleClose: () => void;
    anchorEl: HTMLElement | null;
};

const ActionsList = ({
    actions,
    menuOpen,
    handleClose,
    anchorEl,
}: ActionsListProps): React.ReactElement => {
    const classes = useStyles();

    return (
        <Render condition={Boolean(anchorEl)}>
            <Popper
                open={menuOpen}
                onClose={handleClose}
                anchorEl={anchorEl}
                disablePortal
                className={classes.popper}
                placement={'bottom-end'}
            >
                <div role="list" className={classes.actionList}>
                    {actions.map(({ name, label, action, disabled, icon }, idx) => {
                        const actionId = `${name}:${idx}`;

                        return (
                            <div key={actionId}>
                                <ConditionalWrapper
                                    condition={disabled.status}
                                    wrapper={children => (
                                        <Tooltip title={disabled.reason}>{children}</Tooltip>
                                    )}
                                >
                                    <ListItem button disabled={disabled.status} onClick={action}>
                                        <ListItemIcon>
                                            <Icon icon={icon} width={'25'} />
                                        </ListItemIcon>
                                        <ListItemText primary={label} />
                                    </ListItem>
                                </ConditionalWrapper>
                            </div>
                        );
                    })}
                </div>
            </Popper>
        </Render>
    );
};

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const KubeObjectActions = ({
    children,
    actions = [],
    anchorEl,
    handleCloseActionsMenu,
}: React.PropsWithChildren<KubeObjectActionsProps>): React.ReactElement => {
    const classes = useStyles();

    return (
        <Render condition={!!actions.length}>
            <>
                <ClickAwayListener
                    onClickAway={handleCloseActionsMenu}
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                >
                    <div className={classes.actions}>
                        <ActionsList
                            actions={actions}
                            menuOpen={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            handleClose={handleCloseActionsMenu}
                        />
                    </div>
                </ClickAwayListener>
                {/*eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events*/}
                <div onClick={stopPropagation} onFocus={stopPropagation}>
                    {children}
                </div>
            </>
        </Render>
    );
};
