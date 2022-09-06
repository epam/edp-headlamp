import { createCDPipelineStageInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/stage';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../../plugin.globals';
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
}: useEditorCodeProps): { editorCode: EDPCDPipelineStageKubeObjectInterface } => {
    const editorCode = React.useMemo(() => {
        return createCDPipelineStageInstance(names, formValues, CDPipelineData);
    }, [names, formValues, CDPipelineData]);

    return { editorCode };
};
