import { ICONS } from '../../../../constants/icons';
import { RESOURCE_ACTIONS } from '../../../../constants/resourceActions';
import { getCDPipelineByAutotestBranchItUsesInItsStages } from '../../../../k8s/EDPCDPipeline/getCDPipelineByAutotestBranchItUsesInItsStages';
import { getCDPipelineByCodebaseBranchItUses } from '../../../../k8s/EDPCDPipeline/getCDPipelineByCodebaseBranchItUses';
import { getCDPipelineByGroovyLibraryItUsesInItsStages } from '../../../../k8s/EDPCDPipeline/getCDPipelineByGroovyLibraryItUsesInItsStages';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { createKubeAction } from '../../../../utils/actions/createKubeAction';
import { isAutotest } from '../../../../utils/checks/isAutotest';
import { isGroovyLibrary } from '../../../../utils/checks/isGroovyLibrary';

export const getConflictedCDPipeline = (
    namespace: string,
    codebaseBranch: EDPCodebaseBranchKubeObjectInterface,
    codebase: EDPCodebaseKubeObjectInterface
): Promise<EDPCDPipelineKubeObjectInterface | null> => {
    const {
        metadata: { name },
        spec: { branchName },
    } = codebaseBranch;

    if (isGroovyLibrary(codebase)) {
        return getCDPipelineByGroovyLibraryItUsesInItsStages(namespace, codebase.metadata.name);
    }

    if (isAutotest(codebase)) {
        return getCDPipelineByAutotestBranchItUsesInItsStages(namespace, branchName);
    }

    return getCDPipelineByCodebaseBranchItUses(namespace, name);
};

export const createDeleteAction = (
    kubeObjectData: EDPCodebaseBranchKubeObjectInterface,
    defaultBranch: string,
    action: () => void
) => {
    if (kubeObjectData.spec.branchName === defaultBranch) {
        return createKubeAction({
            name: RESOURCE_ACTIONS['DELETE'],
            disabled: {
                status: true,
                reason: 'You cannot delete the default branch',
            },
            icon: ICONS['BUCKET'],
        });
    }

    return createKubeAction({
        name: RESOURCE_ACTIONS['DELETE'],
        icon: ICONS['BUCKET'],
        action: action,
    });
};
