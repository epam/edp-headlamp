import { CreateKubeObject } from '../../../../components/CreateKubeObject';
import { ICON_PLUS } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { useStyles } from './styles';
import { FloatingActionsProps } from './types';

const { Fab } = MuiCore;
const { Icon } = Iconify;

export const FloatingActions: React.FC<FloatingActionsProps> = ({
    kubeObject,
    kubeObjectExample,
}): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    return (
        <>
            <Fab
                aria-label="add"
                onClick={() => setEditorOpen(true)}
                className={classes.floatingAddButton}
            >
                <Icon icon={ICON_PLUS} className={classes.floatingAddButtonIcon} />
            </Fab>
            <CreateKubeObject
                editorOpen={editorOpen}
                setEditorOpen={setEditorOpen}
                kubeObject={kubeObject}
                kubeObjectExample={kubeObjectExample}
            />
        </>
    );
};
