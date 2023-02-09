import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { React } from '../../../../../plugin.globals';
import { NameValueTableRow } from '../../../../HeadlampNameValueTable/types';

export const useMainInfoRows = (codebaseBranch: EDPCodebaseBranchKubeObjectInterface) =>
    React.useMemo(() => {
        const { spec, status } = codebaseBranch;
        const base: NameValueTableRow[] = [];

        if (spec.fromCommit) {
            base.push({
                name: 'From commit',
                value: spec.fromCommit,
            });
        }

        if (status && status.build) {
            base.push({
                name: 'Build number',
                value: status.build,
            });
        }

        if (status && status.lastSuccessfulBuild) {
            base.push({
                name: 'Last successful build',
                value: status.lastSuccessfulBuild,
            });
        }

        if (spec.version) {
            base.push({
                name: 'Version',
                value: spec.version,
            });
        }

        return base;
    }, [codebaseBranch]);
