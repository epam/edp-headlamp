import { EDPCodebaseBranchKubeObjectConfig } from '../../k8s/EDPCodebaseBranch/config';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

const {
    name: { singularForm },
    group,
    version,
} = EDPCodebaseBranchKubeObjectConfig;

export const createCodebaseBranchExample = (codebaseName: string): any => ({
    apiVersion: `${group}/${version}`,
    kind: capitalizeFirstLetter(singularForm),
    metadata: {
        name: 'your codebase branch name',
        namespace: 'your codebase branch namespace',
    },
    labels: {
        'app.edp.epam.com/codebaseName': codebaseName,
    },
    spec: {
        codebaseName,
    },
});
