import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface UseDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    CDPipelineStageData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>;
}

export const useDefaultValues = ({
    names,
    CDPipelineStageData,
}: UseDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.triggerType.name]: CDPipelineStageData.spec.triggerType,
        };
    }, [CDPipelineStageData, names]);

    return { baseDefaultValues };
};
