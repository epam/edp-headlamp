import { createGitServerInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/git-server';
import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { createRandomFiveSymbolString } from '../../../../../utils/createRandomFiveSymbolString';

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
    const randomPostfix = createRandomFiveSymbolString();

    const editorReturnValues = React.useMemo(() => {
        return createGitServerInstance(
            names,
            formValues,
            randomPostfix
        ) as EDPGitServerKubeObjectInterface;
    }, [names, formValues, randomPostfix]);

    return { editorReturnValues };
};
