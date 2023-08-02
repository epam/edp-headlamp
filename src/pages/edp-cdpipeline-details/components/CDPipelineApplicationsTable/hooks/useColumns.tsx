import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { EnrichedApplicationWithItsImageStreams } from '../../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { routeEDPComponentDetails } from '../../../../edp-component-details/route';

export const useColumns = (): TableColumn<EnrichedApplicationWithItsImageStreams>[] =>
    React.useMemo(
        () => [
            {
                id: 'status',
                label: 'Status',
                render: ({ application }) => {
                    const status = application.status.status;

                    return <StatusIcon status={status || CUSTOM_RESOURCE_STATUSES.UNKNOWN} />;
                },
                width: '10%',
            },
            {
                id: 'application',
                label: 'Application',
                render: ({
                    application: {
                        metadata: { name, namespace },
                    },
                }) => {
                    return (
                        <Link
                            routeName={routeEDPComponentDetails.path}
                            params={{
                                name,
                                namespace,
                            }}
                        >
                            {name}
                        </Link>
                    );
                },
                width: '40%',
            },
            {
                id: 'imageStream',
                label: 'Image stream',
                render: ({
                    applicationImageStream: {
                        metadata: { name },
                    },
                }) => name,
                width: '40%',
            },
            {
                id: 'toPromote',
                label: 'To promote',
                render: ({ toPromote }) => (
                    <Icon icon={toPromote ? ICONS.ACCEPT_ARROW : ICONS.CROSS} width="20" />
                ),
                textAlign: 'center',
            },
        ],
        []
    );
