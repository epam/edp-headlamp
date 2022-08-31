import { createCDPipelineInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/cdpipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
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
}: useEditorCodeProps): { editorReturnValues: EDPCDPipelineKubeObjectInterface } => {
    const editorReturnValues = React.useMemo(() => {
        return createCDPipelineInstance(names, formValues);
    }, [formValues, names]);

    return { editorReturnValues };
};
