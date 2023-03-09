import { createCodebaseBranchInstanceBasedOnFormValues } from '../../../../../configs/k8s-resource-instances/custom-resources/codebase-branch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
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
}: UseEditorCodeProps): { editorReturnValues: EDPCodebaseBranchKubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCodebaseBranchInstanceBasedOnFormValues(
            names,
            formValues,
            codebaseName
        ) as EDPCodebaseBranchKubeObjectInterface;
    }, [names, formValues, codebaseName]);

    return { editorReturnValues };
};
