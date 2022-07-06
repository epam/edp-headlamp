import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon/view';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';

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
                },
                {
                    label: 'Branch Name',
                    getter: ({ spec: { branchName } }) => branchName,
                },
                {
                    label: 'Last Time Updated',
                    getter: ({ status: { lastTimeUpdated } }) => lastTimeUpdated,
                },
            ];
        }, []);
