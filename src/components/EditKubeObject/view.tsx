import type { DialogProps } from '@material-ui/core/Dialog';
import { pluginLib, React, ReactRedux } from '../../plugin.globals';
import { k8s } from '../../plugin.types';
import { clusterAction } from '../../redux/actions';
import { EditKubeObjectProps } from './types';

const {
    CommonComponents: { EditorDialog },
} = pluginLib;
const { useDispatch } = ReactRedux;

export const EditKubeObject = ({
    editorOpen,
    setEditorOpen,
    kubeObject,
    kubeObjectData,
    onEdit,
}: EditKubeObjectProps): React.ReactElement => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const dispatch = useDispatch();

    const applyFunc = async (newItem: k8s.cluster.KubeObjectInterface): Promise<void> => {
        try {
            await kubeObject.apiEndpoint.put(newItem);
            setEditorOpen(false);
        } catch (err) {
            let msg = 'Something went wrong…';
            if (err instanceof Error) {
                msg = err.message;
            }
            setErrorMessage(msg);
            setEditorOpen(true);
            throw err;
        }

        if (onEdit) {
            onEdit();
        }
    };

    const handleSave = async (jsonData: k8s.cluster.KubeObjectInterface): Promise<void> => {
        const {
            metadata: { name },
        } = jsonData;
        const cancelUrl = location.pathname;

        dispatch(
            clusterAction(() => applyFunc(jsonData), {
                startMessage: `Applying changes to ${name}`,
                cancelledMessage: `Cancelled changes to ${name}`,
                successMessage: `Applied changes to ${name}`,
                errorMessage: `Failed to apply changes to ${name}`,
                cancelUrl,
            })
        );
    };

    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    return (
        <EditorDialog
            {...muDialogProps}
            item={kubeObjectData}
            onClose={() => setEditorOpen(false)}
            onSave={handleSave}
            errorMessage={errorMessage}
            onEditorChanged={() => setErrorMessage('')}
        />
    );
};
