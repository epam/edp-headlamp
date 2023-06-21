import { ICONS } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { useStyles } from './styles';

const { Fab } = MuiCore;
const { Icon } = Iconify;

export const CreateKubeObject: React.FC = ({ children }) => {
    const classes = useStyles();

    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const onClose = React.useCallback(() => {
        setCreateDialogOpen(false);
    }, [setCreateDialogOpen]);

    return (
        <>
            <div className={classes.fabWrapper}>
                <Fab
                    aria-label="add"
                    onClick={() => setCreateDialogOpen(true)}
                    className={classes.button}
                >
                    <Icon icon={ICONS['PLUS']} className={classes.buttonIcon} />
                </Fab>
            </div>
            {React.cloneElement(children as React.ReactElement, {
                createDialogOpen,
                onClose,
                setCreateDialogOpen,
            })}
        </>
    );
};
