import React from 'react';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { createCodebaseInstance } from '../../../k8s/EDPCodebase/utils/createCodebaseInstance';
import { FormNameObject } from '../../../types/forms';

interface UseEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
}

export const useEditorCode = ({
    names,
    formValues,
}: UseEditorCodeProps): { editorReturnValues: EDPCodebaseKubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCodebaseInstance(names, formValues) as EDPCodebaseKubeObjectInterface;
    }, [formValues, names]);

    return { editorReturnValues };
};
