import { RESOURCE_ACTIONS } from '../../../../../../constants/resourceActions';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../../k8s/EDPCodebaseBranch/types';
import { createKubeAction } from '../../../../../../utils/actions/createKubeAction';

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
