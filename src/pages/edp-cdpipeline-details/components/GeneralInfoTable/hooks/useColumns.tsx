import { Theme } from '@material-ui/core/styles/createStyles';
import { Render } from '../../../../../components/Render';
import { EDPCDPipelineSpec } from '../../../../../k8s/EDPCDPipeline/types';

const {
    pluginLib: { React, MuiCore },
} = globalThis;

const { Typography } = MuiCore;

const MapProperties: React.FC<{
    properties: string[];
}> = ({ properties }): React.ReactElement => {
    return (
        <>
            {properties.map((el, idx) => {
                const propertyId = `${el}:${idx}`;

                return (
                    <>
                        <Render condition={idx !== 0}>
                            <Typography component="span" key={propertyId}>
                                ,{' '}
                            </Typography>
                        </Render>
                        <Typography component="span" key={propertyId}>
                            {el}
                        </Typography>
                    </>
                );
            })}
        </>
    );
};

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
                value: <MapProperties properties={cdpipelineSpec.applications} />,
            },
            {
                name: 'Applications to promote',
                value: <MapProperties properties={cdpipelineSpec.applicationsToPromote} />,
            },
            {
                name: 'Input docker streams',
                value: <MapProperties properties={cdpipelineSpec.inputDockerStreams} />,
            },
        ],
        [cdpipelineSpec, classes, theme]
    );
