import { ICONS } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { useStyles } from './styles';

const { Fab } = MuiCore;
const { Icon } = Iconify;

export const CreateKubeObject: React.FC = ({ children }): React.ReactElement => {
    const classes = useStyles();

    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const onClose = React.useCallback(() => {
        setCreateDialogOpen(false);
    }, [setCreateDialogOpen]);

    const [isApplying, setIsApplying] = React.useState<boolean>(false);

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
                isApplying,
                setCreateDialogOpen,
                setIsApplying,
            })}
        </>
    );
};
