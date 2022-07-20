import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { React } from '../../../../../plugin.globals';
import { formatDateUTCToLocal } from '../../../../../utils/format/formatDateUTCToLocal';

export const useRows = (codebaseBranch: EDPCodebaseBranchKubeObjectInterface) =>
    React.useMemo(() => {
        const { spec, status } = codebaseBranch;

        return [
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
                name: 'From commit',
                value: spec.fromCommit,
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
    }, [codebaseBranch]);
