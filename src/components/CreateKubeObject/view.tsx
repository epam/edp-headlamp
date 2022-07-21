import type { DialogProps } from '@material-ui/core/Dialog';
import { pluginLib, React, ReactRedux } from '../../plugin.globals';
import { k8s } from '../../plugin.types';
import { clusterAction } from '../../redux/actions';
import { CreateKubeObjectProps } from './types';

const { useDispatch } = ReactRedux;
const {
    CommonComponents: { EditorDialog },
} = pluginLib;

export const CreateKubeObject: React.FC<CreateKubeObjectProps> = ({
    editorOpen,
    setEditorOpen,
    kubeObject,
    kubeObjectExample,
    onCreate,
}): React.ReactElement => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const dispatch = useDispatch();

    const applyFunc = async (newItem: k8s.cluster.KubeObjectInterface): Promise<void> => {
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

    const handleSave = async (data: k8s.cluster.KubeObjectInterface): Promise<void> => {
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

    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    return (
        <EditorDialog
            {...muDialogProps}
            data-testid={'CreateKubeObject.EditorDialog'}
            item={kubeObjectExample}
            title={`Create ${kubeObjectExample.kind}`}
            onClose={() => setEditorOpen(false)}
            onSave={handleSave}
            errorMessage={errorMessage}
            onEditorChanged={() => setErrorMessage('')}
        />
    );
};
