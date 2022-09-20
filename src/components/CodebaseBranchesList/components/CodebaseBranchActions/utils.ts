import { ICON_BUCKET } from '../../../../constants/icons';
import { KUBE_OBJECT_ACTION_DELETE } from '../../../../constants/kubeObjectActions';
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
            name: KUBE_OBJECT_ACTION_DELETE,
            disabled: {
                status: true,
                reason: 'You cannot delete the default branch',
            },
            icon: ICON_BUCKET,
        });
    }

    return createKubeAction({
        name: KUBE_OBJECT_ACTION_DELETE,
        icon: ICON_BUCKET,
        action: action,
    });
};
