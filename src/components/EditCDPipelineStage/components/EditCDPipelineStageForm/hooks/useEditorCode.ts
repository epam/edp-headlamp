import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { editCDPipelineStageInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/stage';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface useEditorCodeProps {
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
}: useEditorCodeProps): { editorReturnValues: KubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return editCDPipelineStageInstance(
            names,
            kubeObjectData,
            formValues
        ) as KubeObjectInterface;
    }, [formValues, kubeObjectData, names]);

    return { editorReturnValues };
};
