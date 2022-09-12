import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { createCDPipelineInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/cdpipeline';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useEditorCodeProps {
    names: { [key: string]: FormNameObject };
    formValues: {
        [key: string]: any;
    };
}

export const useEditorReturnValues = ({
    names,
    formValues,
}: useEditorCodeProps): { editorReturnValues: KubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCDPipelineInstance(names, formValues) as KubeObjectInterface;
    }, [formValues, names]);

    return { editorReturnValues };
};
