import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { clusterAction } from '../../redux/actions';
import { CreateKubeObjectProps } from './types';

const {
    pluginLib: { React, ReactRedux, CommonComponents },
} = globalThis;
const { EditorDialog } = CommonComponents;
const { useDispatch } = ReactRedux;

export const CreateKubeObject: React.FC<CreateKubeObjectProps> = ({
    editorOpen,
    setEditorOpen,
    kubeObject,
    kubeObjectExample,
    onCreate,
}): React.ReactElement => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');
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

        if (onCreate) {
            onCreate();
        }
    };

    const handleSave = async (data: KubeObjectInterface): Promise<void> => {
        const {
            metadata: { name },
        } = data;
        const cancelUrl = location.pathname;

        dispatch(
            clusterAction(() => applyFunc(data), {
                startMessage: `Applying ${name}`,
                cancelledMessage: `Cancelled applying ${name}`,
                successMessage: `Applied ${name}`,
                errorMessage: `Failed to apply ${name}`,
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
