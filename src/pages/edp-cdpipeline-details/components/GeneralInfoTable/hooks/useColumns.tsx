import { MappedProperties } from '../../../../../components/MappedProperties';
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
            {
                name: 'Applications',
                value: (
                    <MappedProperties properties={cdpipelineSpec.applications} variant={'block'} />
                ),
            },
            {
                name: 'Applications to promote',
                value: (
                    <MappedProperties
                        properties={cdpipelineSpec.applicationsToPromote}
                        variant={'block'}
                    />
                ),
            },
            {
                name: 'Input docker streams',
                value: (
                    <MappedProperties
                        properties={cdpipelineSpec.inputDockerStreams}
                        variant={'block'}
                    />
                ),
            },
        ],
        [cdpipelineSpec]
    );
