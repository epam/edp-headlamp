import { ICONS } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { useStyles } from './styles';

const { Fab } = MuiCore;
const { Icon } = Iconify;

export const CreateKubeObject: React.FC = ({ children }): React.ReactElement => {
    const classes = useStyles();

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

    return (
        <>
            <Fab
                aria-label="add"
                onClick={() => setCreateDialogOpen(true)}
                className={classes.button}
            >
                <Icon icon={ICONS['PLUS']} className={classes.buttonIcon} />
            </Fab>
            {React.cloneElement(children as React.ReactElement, {
                createDialogOpen,
                onClose,
                setCreateDialogOpen,
            })}
        </>
    );
};
