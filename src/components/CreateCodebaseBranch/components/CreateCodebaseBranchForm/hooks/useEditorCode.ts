import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { createCodebaseBranchInstanceBasedOnFormValues } from '../../../../../configs/k8s-resource-instances/custom-resources/codebase-branch';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useEditorCodeProps {
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
    namespace,
}: useEditorCodeProps): { editorReturnValues: KubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCodebaseBranchInstanceBasedOnFormValues(
            names,
            formValues,
            codebaseName,
            namespace
        ) as KubeObjectInterface;
    }, [names, formValues, codebaseName, namespace]);

    return { editorReturnValues };
};
