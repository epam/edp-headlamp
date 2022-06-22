import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { clusterAction } from '../../redux/actions';
import { CreateKubeObjectProps } from './types';

const {
    pluginLib: { React, ReactRedux, CommonComponents },
} = window;
const { EditorDialog } = CommonComponents;
const { useDispatch } = ReactRedux;

export const CreateKubeObject: React.FC<CreateKubeObjectProps> = ({
    editorOpen,
    setEditorOpen,
    kubeObject,
    kubeObjectExample,
}): React.ReactElement => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const dispatch = useDispatch();

    const applyFunc = async (newItem: KubeObjectInterface): Promise<void> => {
        try {
            await kubeObject.apiEndpoint.post(newItem);
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

    const handleSave = async (data: KubeObjectInterface): Promise<void> => {
        const cancelUrl = location.pathname;
        const newItemName = data.metadata.name;

        dispatch(
            clusterAction(() => applyFunc(data), {
                startMessage: `Applying ${newItemName}`,
                cancelledMessage: `Cancelled applying ${newItemName}`,
                successMessage: `Applied ${newItemName}`,
                errorMessage: `Failed to apply ${newItemName}`,
                cancelUrl,
            })
        );
    };

    return (
        <EditorDialog
            item={kubeObjectExample}
            title={`Create ${kubeObjectExample.kind}`}
            open={editorOpen}
            onClose={() => setEditorOpen(false)}
            onSave={handleSave}
            errorMessage={errorMessage}
            onEditorChanged={() => setErrorMessage('')}
        />
    );
};
