import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectConfig } from '../../../k8s/EDPCodebaseBranch/config';
import { DeepPartial } from '../../../types/global';
import { EDPKubeObjectInterface } from '../../../types/k8s';
import { capitalizeFirstLetter } from '../../../utils/format/capitalizeFirstLetter';

const {
    name: { singularForm },
    group,
    version,
} = EDPCodebaseBranchKubeObjectConfig;

export const createCodebaseBranchExample = (
    kubeObjectData: EDPCodebaseKubeObjectInterface
): DeepPartial<EDPKubeObjectInterface> => ({
    apiVersion: `${group}/${version}`,
    kind: capitalizeFirstLetter(singularForm),
    metadata: {
        name: 'your codebase branch name',
        namespace: kubeObjectData.metadata.namespace,
    },
    labels: {
        'app.edp.epam.com/codebaseName': kubeObjectData.metadata.name,
    },
    spec: {
        codebaseName: kubeObjectData.metadata.name,
    },
});
