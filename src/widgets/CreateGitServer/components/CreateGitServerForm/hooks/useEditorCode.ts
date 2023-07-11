import React from 'react';
import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
import { createGitServerInstance } from '../../../../../k8s/EDPGitServer/utils/createGitServerInstance';
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
}: UseEditorCodeProps): { editorReturnValues: EDPGitServerKubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createGitServerInstance(names, formValues) as EDPGitServerKubeObjectInterface;
    }, [names, formValues]);

    return { editorReturnValues };
};
