import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { createCodebaseBranchInstanceBasedOnFormValues } from '../../../../../configs/k8s-resource-instances/custom-resources/codebase-branch';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface UseEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
    codebaseName: string;
    namespace: string;
}

export const useEditorCode = ({
    names,
    formValues,
    codebaseName,
}: UseEditorCodeProps): { editorReturnValues: KubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCodebaseBranchInstanceBasedOnFormValues(
            names,
            formValues,
            codebaseName
        ) as KubeObjectInterface;
    }, [names, formValues, codebaseName]);

    return { editorReturnValues };
};
