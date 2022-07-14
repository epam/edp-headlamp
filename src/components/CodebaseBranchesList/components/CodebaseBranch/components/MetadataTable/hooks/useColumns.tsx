import { Theme } from '@material-ui/core/styles/createStyles';
import { EDPKubeMetadata } from '../../../../../../../types/k8s';
import { formatDateUTCToLocal } from '../../../../../../../utils/format/formatDateUTCToLocal';
import { MappedProperties } from '../../../../../../MappedProperties';

const {
    pluginLib: { React },
} = globalThis;

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
                value: <MappedProperties properties={metadata.finalizers} />,
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
