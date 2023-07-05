import React from 'react';
import { createCDPipelineInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/cdpipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { FormNameObject } from '../../../../../types/forms';

interface UseEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
}

export const useEditorReturnValues = ({
    names,
    formValues,
}: UseEditorCodeProps): { editorReturnValues: EDPCDPipelineKubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCDPipelineInstance(names, formValues) as EDPCDPipelineKubeObjectInterface;
    }, [formValues, names]);

    return { editorReturnValues };
};
