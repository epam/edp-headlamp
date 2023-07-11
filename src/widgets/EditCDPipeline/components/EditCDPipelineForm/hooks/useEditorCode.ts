import React from 'react';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { editCDPipelineInstance } from '../../../../../k8s/EDPCDPipeline/utils/editCDPipelineInstance';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface useEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
    kubeObjectData: DeepPartial<EDPCDPipelineKubeObjectInterface>;
}

export const useEditorCode = ({
    names,
    formValues,
    kubeObjectData,
}: useEditorCodeProps): { editorReturnValues: EDPCDPipelineKubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return editCDPipelineInstance(
            names,
            kubeObjectData,
            formValues
        ) as EDPCDPipelineKubeObjectInterface;
    }, [formValues, kubeObjectData, names]);

    return { editorReturnValues };
};
