import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { EDPGitServerKubeObject } from '../../../../../k8s/EDPGitServer';
import { EDPGitServerKubeObjectInterface } from '../../../../../k8s/EDPGitServer/types';
import { pluginLib, React } from '../../../../../plugin.globals';
import { GIT_SERVER_ROUTE_NAME } from '../../../../../routes/names';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';

const {
    CommonComponents: { Link },
} = pluginLib;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPGitServerKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status }) => (
                    <StatusIcon
                        status={status ? status.status : CUSTOM_RESOURCE_STATUSES['UNKNOWN']}
                    />
                ),
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'gitHost',
                getter: data => {
                    const kubeObjectBasedOnData = new EDPGitServerKubeObject(data);

                    return (
                        <Link
                            to={kubeObjectBasedOnData.getDetailsLink(GIT_SERVER_ROUTE_NAME)}
                            kubeObject={null}
                            routeName={null}
                        >
                            {data.spec.gitHost}
                        </Link>
                    );
                },
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
