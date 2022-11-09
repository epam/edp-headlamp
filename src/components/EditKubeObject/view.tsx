import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import type { DialogProps } from '@material-ui/core/Dialog';
import { useRequest } from '../../hooks/useRequest';
import { pluginLib, React } from '../../plugin.globals';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { EditKubeObjectProps } from './types';

const {
    CommonComponents: { EditorDialog },
} = pluginLib;

export const EditKubeObject = ({
    editorOpen,
    setEditorOpen,
    kubeObject,
    kubeObjectData,
    onEdit,
}: EditKubeObjectProps): React.ReactElement => {
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const applyFunc = async (newItem: EDPKubeObjectInterface): Promise<void> => {
        try {
            await kubeObject.apiEndpoint.put(newItem);
            setEditorOpen(false);
        } catch (err) {
            let msg = `Oops! Something went wrong! Couldn't apply "${newItem.metadata.name}"`;
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

    const { fireRequest } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'edit',
        },
    });

    const handleSave = async (kubeObjectData: EDPKubeObjectInterface): Promise<void> => {
        await fireRequest({
            objectName: kubeObjectData.metadata.name,
            args: [kubeObjectData],
        });
    };

    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    return (
        <EditorDialog
            {...muDialogProps}
            item={kubeObjectData as Partial<KubeObjectInterface>}
            onClose={() => setEditorOpen(false)}
            onSave={handleSave}
            errorMessage={errorMessage}
            onEditorChanged={() => setErrorMessage('')}
        />
    );
};
