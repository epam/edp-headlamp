import React from 'react';
import { createCDPipelineStageInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/stage';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface useEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
    CDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>;
}

export const useEditorCode = ({
    names,
    formValues,
    CDPipelineData,
}: useEditorCodeProps): { editorReturnValues: EDPCDPipelineStageKubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCDPipelineStageInstance(
            names,
            formValues,
            CDPipelineData
        ) as EDPCDPipelineStageKubeObjectInterface;
    }, [names, formValues, CDPipelineData]);

    return { editorReturnValues };
};
