import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { React } from '../../../../../plugin.globals';
import { formatDateUTCToLocal } from '../../../../../utils/format/formatDateUTCToLocal';
import { NameValueTableRow } from '../../../../HeadlampNameValueTable/types';

export const useRows = (codebaseBranch: EDPCodebaseBranchKubeObjectInterface) =>
    React.useMemo(() => {
        const { spec, status } = codebaseBranch;

        const base: NameValueTableRow[] = [
            {
                name: 'Status',
                value: status && status.status,
            },
            {
                name: 'Branch name',
                value: spec.branchName,
            },
            {
                name: 'Codebase name',
                value: spec.codebaseName,
            },
            {
                name: 'Release',
                value: String(spec.release),
            },
            {
                name: 'Last time updated',
                value: status && formatDateUTCToLocal(status.lastTimeUpdated),
            },
        ];

        if (spec.fromCommit) {
            base.push({
                name: 'From commit',
                value: spec.fromCommit,
            });
        }

        return base;
    }, [codebaseBranch]);
