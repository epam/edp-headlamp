import { EDPCDPipelineSpec } from '../../../../../k8s/EDPCDPipeline/types';
import { React } from '../../../../../plugin.globals';

export const useColumns = (cdpipelineSpec: EDPCDPipelineSpec) =>
    React.useMemo(
        () => [
            {
                name: 'Name',
                value: cdpipelineSpec.name,
            },
            {
                name: 'Deployment type',
                value: cdpipelineSpec.deploymentType,
            },
        ],
        [cdpipelineSpec]
    );
