import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { clusterAction } from '../../redux/actions';
import { EditKubeObjectProps } from './types';

const {
    pluginLib: { React, ReactRedux, CommonComponents },
} = globalThis;
const { useDispatch } = ReactRedux;
const { EditorDialog } = CommonComponents;

export const EditKubeObject: React.FC<EditKubeObjectProps> = ({
    editorOpen,
    setEditorOpen,
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const dispatch = useDispatch();

    const applyFunc = async (newItem: KubeObjectInterface): Promise<void> => {
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
    };

    const handleSave = async (jsonData: KubeObjectInterface): Promise<void> => {
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

    return (
        <EditorDialog
            item={kubeObjectData.jsonData}
            open={editorOpen}
            onClose={() => setEditorOpen(false)}
            onSave={handleSave}
            errorMessage={errorMessage}
            onEditorChanged={() => setErrorMessage('')}
        />
    );
};
