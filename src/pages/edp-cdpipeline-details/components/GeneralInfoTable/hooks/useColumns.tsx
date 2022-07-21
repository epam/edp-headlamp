import { Theme } from '@material-ui/core/styles/createStyles';
import { MappedProperties } from '../../../../../components/MappedProperties';
import { EDPCDPipelineSpec } from '../../../../../k8s/EDPCDPipeline/types';
import { React } from '../../../../../plugin.globals';

export const useColumns = (
    cdpipelineSpec: EDPCDPipelineSpec,
    classes: { [key: string]: string },
    theme: Theme
) =>
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
                value: <MappedProperties properties={cdpipelineSpec.applications} />,
            },
            {
                name: 'Applications to promote',
                value: <MappedProperties properties={cdpipelineSpec.applicationsToPromote} />,
            },
            {
                name: 'Input docker streams',
                value: <MappedProperties properties={cdpipelineSpec.inputDockerStreams} />,
            },
        ],
        [cdpipelineSpec, classes, theme]
    );
