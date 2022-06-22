import { CreateKubeObject } from '../../../../components/CreateKubeObject';
import { useStyles } from './styles';
import { FloatingActionsProps } from './types';

const {
    pluginLib: { React, MuiCore, Iconify },
} = window;
const { Fab } = MuiCore;
const { Icon } = Iconify;

export const FloatingActions: React.FC<FloatingActionsProps> = ({
    kubeObject,
    kubeObjectExample,
}): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState(false);
    return (
        <>
            <Fab
                aria-label="add"
                onClick={() => setEditorOpen(true)}
                className={classes.floatingAddButton}
            >
                <Icon icon="akar-icons:plus" className={classes.floatingAddButtonIcon} />
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
