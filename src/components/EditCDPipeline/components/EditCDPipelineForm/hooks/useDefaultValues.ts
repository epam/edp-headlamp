import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface useDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    CDPipelineData: DeepPartial<EDPCDPipelineKubeObjectInterface>;
}

export const useDefaultValues = ({
    names,
    CDPipelineData,
}: useDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.namespace.name]: CDPipelineData.metadata.namespace,
            [names.applications.name]: CDPipelineData.spec.applications,
            [names.applicationsToPromote.name]: CDPipelineData.spec.applicationsToPromote,
            [names.inputDockerStreams.name]: CDPipelineData.spec.inputDockerStreams,
        };
    }, [CDPipelineData, names]);

    return { baseDefaultValues };
};
