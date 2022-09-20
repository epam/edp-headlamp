import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { createCodebaseInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/codebase';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface UseEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
    type: string;
}

export const useEditorCode = ({
    names,
    formValues,
    type,
}: UseEditorCodeProps): { editorReturnValues: KubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCodebaseInstance(names, type, formValues) as KubeObjectInterface;
    }, [formValues, names, type]);

    return { editorReturnValues };
};
