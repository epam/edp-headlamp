import { editCDPipelineInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/cdpipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { React } from '../../../../../plugin.globals';
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
