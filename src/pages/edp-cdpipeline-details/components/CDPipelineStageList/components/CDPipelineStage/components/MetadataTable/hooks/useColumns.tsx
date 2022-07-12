import { Theme } from '@material-ui/core/styles/createStyles';
import { Render } from '../../../../../../../../../components/Render';
import { EDPKubeMetadata } from '../../../../../../../../../types/k8s';
import { formatDateUTCToLocal } from '../../../../../../../../../utils/format/formatDateUTCToLocal';

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
    metadata: EDPKubeMetadata,
    classes: { [key: string]: string },
    theme: Theme
) =>
    React.useMemo(
        () => [
            {
                name: 'Name',
                value: metadata.name,
            },
            {
                name: 'Namespace',
                value: metadata.namespace,
            },
            {
                name: 'Created',
                value: formatDateUTCToLocal(metadata.creationTimestamp),
            },
            {
                name: 'Finalizers',
                value: <MapProperties properties={metadata.finalizers} />,
            },
            {
                name: 'Generation',
                value: metadata.generation,
            },
            {
                name: 'Resource version',
                value: metadata.resourceVersion,
            },
            {
                name: 'UID',
                value: metadata.uid,
            },
        ],
        [metadata, classes, theme]
    );
