import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon/view';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { formatDateUTCToLocal } from '../../../../../utils/format/formatDateUTCToLocal';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';

const {
    pluginLib: { React },
} = globalThis;

export const useColumns =
    (): HeadlampSimpleTableGetterColumn<EDPCodebaseBranchKubeObjectInterface>[] =>
        React.useMemo(() => {
            return [
                {
                    label: 'Status',
                    getter: ({ status: { status } }) => <StatusIcon status={status} />,
                    sort: (a, b) => sortByStatus(a.status.status, b.status.status),
                },
                {
                    label: 'Branch Name',
                    getter: ({ spec: { branchName } }) => branchName,
                    sort: (a, b) => sortByName(a.spec.branchName, b.spec.branchName),
                },
                {
                    label: 'Codebase Name',
                    getter: ({ spec: { codebaseName } }) => codebaseName,
                    sort: (a, b) => sortByName(a.spec.codebaseName, b.spec.codebaseName),
                },
                {
                    label: 'Release',
                    getter: ({ spec: { release } }) => String(release),
                },
                {
                    label: 'Version',
                    getter: ({ spec: { version } }) => version,
                },
                {
                    label: 'Last Time Updated',
                    getter: ({ status: { lastTimeUpdated } }) =>
                        formatDateUTCToLocal(lastTimeUpdated),
                },
            ];
        }, []);
