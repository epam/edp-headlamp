import React from 'react';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { editCDPipelineStageInstance } from '../../../../../k8s/EDPCDPipelineStage/utils/editCDPipelineStageInstance';
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
