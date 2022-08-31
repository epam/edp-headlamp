import { createCodebaseInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/codebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useEditorCodeProps {
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
}: useEditorCodeProps): { editorCode: EDPCodebaseKubeObjectInterface } => {
    const editorCode = React.useMemo(() => {
        return createCodebaseInstance(names, type, formValues);
    }, [formValues, names, type]);

    return { editorCode };
};
