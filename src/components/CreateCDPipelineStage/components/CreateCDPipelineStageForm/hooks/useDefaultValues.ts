import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface useDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    CDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>;
    stagesQuantity: number;
}

export const useDefaultValues = ({
    names,
    CDPipelineData,
    stagesQuantity,
}: useDefaultValuesProps): { [key: string]: any } => {
    const {
        metadata: { namespace },
    } = CDPipelineData;

    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.namespace.name]: namespace,
            [names.order.name]: stagesQuantity,
            [names.triggerType.name]: 'manual',
            [names.jobProvisioning.name]: 'default',
            [names.sourceLibraryName.name]: 'default',
            [names.sourceType.name]: 'default',
        };
    }, [
        names.jobProvisioning.name,
        names.namespace.name,
        names.order.name,
        names.sourceLibraryName.name,
        names.sourceType.name,
        names.triggerType.name,
        namespace,
        stagesQuantity,
    ]);

    return { baseDefaultValues };
};
