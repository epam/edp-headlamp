import React from 'react';
import { createGitServerInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/git-server';
import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
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
