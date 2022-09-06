import { createCodebaseBranchInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/codebase-branch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
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
}: useEditorCodeProps): { editorCode: EDPCodebaseBranchKubeObjectInterface } => {
    const editorCode = React.useMemo(() => {
        return createCodebaseBranchInstance(names, formValues, codebaseName, namespace);
    }, [names, formValues, codebaseName, namespace]);

    return { editorCode };
};
