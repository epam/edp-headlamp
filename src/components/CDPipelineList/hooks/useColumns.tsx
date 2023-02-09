import { CUSTOM_RESOURCE_STATUSES } from '../../../constants/statuses';
import { EDPCDPipelineKubeObjectInterface } from '../../../k8s/EDPCDPipeline/types';
import { MuiCore, pluginLib, React } from '../../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../../routes/names';
import { capitalizeFirstLetter } from '../../../utils/format/capitalizeFirstLetter';
import { createRouteNameBasedOnNameAndNamespace } from '../../../utils/routes/createRouteName';
import { sortByName } from '../../../utils/sort/sortByName';
import { sortByStatus } from '../../../utils/sort/sortByStatus';
import { rem } from '../../../utils/styling/rem';
import { CDPipelineActions } from '../../CDPipelineActions';
import { HeadlampSimpleTableGetterColumn } from '../../HeadlampSimpleTable/types';
import { MappedProperties } from '../../MappedProperties';
import { Render } from '../../Render';
import { StatusIcon } from '../../StatusIcon';

const {
    CommonComponents: { Link },
} = pluginLib;
const { Typography } = MuiCore;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCDPipelineKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status: CDPipelineStatus }) => {
                    const status = CDPipelineStatus
                        ? CDPipelineStatus.status
                        : CUSTOM_RESOURCE_STATUSES['UNKNOWN'];

                    const title = (
                        <>
                            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                {capitalizeFirstLetter(status)}
                            </Typography>
                            <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                                <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                                    {CDPipelineStatus?.detailed_message}
                                </Typography>
                            </Render>
                        </>
                    );

                    return <StatusIcon status={status} customTitle={title} />;
                },
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'CD Pipeline',
                getter: ({ metadata: { name, namespace } }) => {
                    return (
                        <Link
                            routeName={createRouteNameBasedOnNameAndNamespace(
                                CDPIPELINES_ROUTE_NAME
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
                sort: (a, b) => sortByName(a.metadata.name, b.metadata.name),
            },
            {
                label: 'Applications',
                getter: ({ spec: { applications } }) => (
                    <MappedProperties properties={applications} variant={'block'} />
                ),
            },
            {
                label: '',
                getter: kubeObjectData => <CDPipelineActions kubeObjectData={kubeObjectData} />,
            },
        ],
        []
    );
