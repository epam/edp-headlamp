import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { createCDPipelineStageInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/stage';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
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
}: useEditorCodeProps): { editorReturnValues: KubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCDPipelineStageInstance(
            names,
            formValues,
            CDPipelineData
        ) as KubeObjectInterface;
    }, [names, formValues, CDPipelineData]);

    return { editorReturnValues };
};
