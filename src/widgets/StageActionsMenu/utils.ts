import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { StageKubeObject } from '../../k8s/groups/EDP/Stage';
import { StageKubeObjectInterface } from '../../k8s/groups/EDP/Stage/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { KubeObjectAction } from '../../types/actions';
import { createKubeAction } from '../../utils/actions/createKubeAction';
import { widgetPermissionsToCheck } from './constants';

const getStageOrder = (stage: StageKubeObjectInterface): number => stage.spec.order;

export const createDeleteAction = async ({
  allStages,
  currentStage,
  action,
  permissions,
}: {
  allStages: StageKubeObjectInterface[];
  currentStage: StageKubeObjectInterface;
  action: () => void;
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
}): Promise<KubeObjectAction> => {
  if (!currentStage) {
    return;
  }

  // CD pipeline could publis artifacts without any stage
  // so, in case it doesn't have any stage
  // probably this is something wrong and somebody messed-up CR
  if (allStages.length === 0) {
    throw new Error('Deployment Flow should have at least one Environment');
  }

  // we don't let user remove last stage
  if (allStages.length === 1) {
    return createKubeAction({
      name: RESOURCE_ACTIONS.DELETE,
      disabled: {
        status: true,
        reason: 'Deployment Flow should have at least one Environment',
      },
      icon: ICONS.BUCKET,
    });
  }

  const currentStageOrder = getStageOrder(currentStage);
  const otherStages = allStages.filter((el) => el.metadata.name !== currentStage.metadata.name);
  const highestOtherStagesOrder = Math.max(...otherStages.map(getStageOrder));

  if (currentStageOrder > highestOtherStagesOrder) {
    return createKubeAction({
      item: new StageKubeObject(currentStage) as unknown as KubeObjectInterface,
      actionCheckName: 'delete',
      name: RESOURCE_ACTIONS.DELETE,
      icon: ICONS.BUCKET,
      disabled: {
        status: !permissions?.delete?.Stage.allowed,
        reason: permissions?.delete?.Stage.reason,
      },
      action: action,
    });
  }

  return await createKubeAction({
    item: new StageKubeObject(currentStage) as unknown as KubeObjectInterface,
    actionCheckName: 'delete',
    name: RESOURCE_ACTIONS.DELETE,
    disabled: {
      status: true,
      reason: 'You are able to delete only the last Environment',
    },
    icon: ICONS.BUCKET,
  });
};
