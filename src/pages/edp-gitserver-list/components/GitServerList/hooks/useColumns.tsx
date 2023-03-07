import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { Render } from '../../../../../components/Render';
import { StatusIcon } from '../../../../../components/StatusIcon';
import {
    CUSTOM_RESOURCE_ACTIVE_STATUSES,
    CUSTOM_RESOURCE_STATUSES,
} from '../../../../../constants/statuses';
import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
import { MuiCore, pluginLib, React } from '../../../../../plugin.globals';
import { GIT_SERVERS_ROUTE_NAME } from '../../../../../routes/names';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../utils/routes/createRouteName';
import { sortByActiveStatus } from '../../../../../utils/sort/sortByActiveStatus';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { rem } from '../../../../../utils/styling/rem';

const {
    CommonComponents: { Link },
} = pluginLib;

const { Typography } = MuiCore;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPGitServerKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status: gitServerStatus }) => {
                    const status = gitServerStatus
                        ? gitServerStatus.value
                        : CUSTOM_RESOURCE_ACTIVE_STATUSES['UNKNOWN'];

                    const statusTitle = (
                        <>
                            <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                {capitalizeFirstLetter(status)}
                            </Typography>
                            <Render condition={status === CUSTOM_RESOURCE_STATUSES['FAILED']}>
                                <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                                    {gitServerStatus?.detailed_message}
                                </Typography>
                            </Render>
                        </>
                    );

                    return <StatusIcon status={status} customTitle={statusTitle} />;
                },
                sort: (a, b) => sortByActiveStatus(a.status.value, b.status.value),
            },
            {
                label: 'Name',
                getter: ({ metadata: { name, namespace } }) => {
                    return (
                        <Link
                            routeName={createRouteNameBasedOnNameAndNamespace(
                                GIT_SERVERS_ROUTE_NAME
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
                label: 'gitHost',
                getter: ({ spec: { gitHost } }) => gitHost,
                sort: (a, b) => sortByName(a.spec.gitHost, b.spec.gitHost),
            },
            {
                label: 'gitUser',
                getter: ({ spec: { gitUser } }) => gitUser,
                sort: (a, b) => sortByName(a.spec.gitUser, b.spec.gitUser),
            },
            {
                label: 'httpsPort',
                getter: ({ spec: { httpsPort } }) => httpsPort,
                sort: (a, b) => sortByName(a.spec.httpsPort, b.spec.httpsPort),
            },
            {
                label: 'nameSshKeySecret',
                getter: ({ spec: { nameSshKeySecret } }) => nameSshKeySecret,
                sort: (a, b) => sortByName(a.spec.nameSshKeySecret, b.spec.nameSshKeySecret),
            },
            {
                label: 'sshPort',
                getter: ({ spec: { sshPort } }) => sshPort,
                sort: (a, b) => sortByName(a.spec.sshPort, b.spec.sshPort),
            },
        ],
        []
    );
