import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { ICONS } from '../../../../../constants/icons';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { EnrichedApplication } from '../../../../../hooks/useApplicationsInCDPipeline';
import { Iconify, pluginLib, React } from '../../../../../plugin.globals';
import { APPLICATIONS_ROUTE_NAME } from '../../../../../routes/names';
import { DeepPartial } from '../../../../../types/global';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../utils/routes/createRouteName';

const {
    CommonComponents: { Link },
} = pluginLib;
const { Icon } = Iconify;

export const useColumns = (): HeadlampSimpleTableGetterColumn<DeepPartial<EnrichedApplication>>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ application: { status } }) => (
                    <StatusIcon
                        status={status ? status.status : CUSTOM_RESOURCE_STATUSES['UNKNOWN']}
                    />
                ),
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
                            routeName={createRouteNameBasedOnNameAndNamespace(
                                APPLICATIONS_ROUTE_NAME
                            )}
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
                label: 'Branch',
                getter: ({ applicationBranch }) => applicationBranch,
            },
            {
                label: 'To promote',
                getter: ({ toPromote }) => (
                    <Icon icon={toPromote ? ICONS['ACCEPT_ARROW'] : ICONS['CROSS']} width="20" />
                ),
            },
        ],
        []
    );
