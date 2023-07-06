import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { ICONS } from '../../../../../constants/icons';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { EnrichedApplicationWithItsImageStreams } from '../../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { DeepPartial } from '../../../../../types/global';
import { routeEDPComponentDetails } from '../../../../edp-component-details/route';

export const useColumns = (): HeadlampSimpleTableGetterColumn<
    DeepPartial<EnrichedApplicationWithItsImageStreams>
>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ application }) => {
                    const status = application.status.status;

                    return <StatusIcon status={status || CUSTOM_RESOURCE_STATUSES.UNKNOWN} />;
                },
            },
            {
                label: 'Application',
                getter: ({
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
            },
            {
                label: 'Image stream',
                getter: ({
                    applicationImageStream: {
                        metadata: { name },
                    },
                }) => name,
            },
            {
                label: 'To promote',
                getter: ({ toPromote }) => (
                    <Icon icon={toPromote ? ICONS.ACCEPT_ARROW : ICONS.CROSS} width="20" />
                ),
            },
        ],
        []
    );
