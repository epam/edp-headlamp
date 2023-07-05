import React from 'react';
import { editCDPipelineStageInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/stage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface UseEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
    kubeObjectData: DeepPartial<EDPCodebaseKubeObjectInterface>;
}

export const useEditorCode = ({
    names,
    formValues,
    kubeObjectData,
}: UseEditorCodeProps): { editorReturnValues: EDPCDPipelineStageKubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return editCDPipelineStageInstance(
            names,
            kubeObjectData,
            formValues
        ) as EDPCDPipelineStageKubeObjectInterface;
    }, [formValues, kubeObjectData, names]);

    return { editorReturnValues };
};
