import { createCodebaseExample } from '../../../../../configs/kube-examples/edp-codebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface useEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: any;
    type: string;
}

export const useEditorCode = ({
    names,
    formValues,
    type,
}: useEditorCodeProps): { editorCode: DeepPartial<EDPCodebaseKubeObjectInterface> } => {
    const editorCode = React.useMemo(() => {
        return createCodebaseExample(names, type, formValues);
    }, [formValues, names, type]);

    return { editorCode };
};
