import { Render } from '../Render';
import { useStyles } from './styles';
import { KubeObjectAction, KubeObjectActionsProps } from './types';

const {
    pluginLib: { React, MuiCore },
} = globalThis;
const { Tooltip, List, ListItem, ListItemText, ClickAwayListener } = MuiCore;

const ActionsList = ({ actions }: { actions: KubeObjectAction[] }) => (
    <List component="nav">
        {actions.map(({ name, label, action, disabled = false }, idx) => {
            const actionId = `${name}:${idx}`;

            return (
                <ListItem key={actionId} button disabled={disabled} onClick={action}>
                    <ListItemText primary={label} />
                </ListItem>
            );
        })}
    </List>
);

export const KubeObjectActions: React.FC<KubeObjectActionsProps> = ({
    children,
    actions = [],
    tooltipOpen = false,
    setTooltipOpen,
}): React.ReactElement => {
    const classes = useStyles();

    const handleTooltipClose = React.useCallback(() => {
        setTooltipOpen(false);
    }, [setTooltipOpen]);

    return (
        <Render condition={!!actions.length}>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div className={classes.actions}>
                    <Tooltip
                        PopperProps={{ disablePortal: true }}
                        onClose={handleTooltipClose}
                        open={tooltipOpen}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={<ActionsList actions={actions} />}
                    >
                        {children}
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </Render>
    );
};
