import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { createGitServerInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/git-server';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface UseEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
}

export const useEditorCode = ({
    names,
    formValues,
}: UseEditorCodeProps): { editorReturnValues: KubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createGitServerInstance(names, formValues) as KubeObjectInterface;
    }, [names, formValues]);

    return { editorReturnValues };
};
