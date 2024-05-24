import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { RESOURCE_ACTIONS } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { KubeObjectAction } from '../../types/actions';
import { DeepPartial } from '../../types/global';
import { createKubeAction } from '../../utils/actions/createKubeAction';

const getStageOrder = (stage: DeepPartial<EDPCDPipelineStageKubeObjectInterface>): number =>
  stage.spec.order;

export const createDeleteAction = async (
  allStages: EDPCDPipelineStageKubeObjectInterface[],
  currentStage: EDPCDPipelineStageKubeObjectInterface,
  action: () => void
): Promise<KubeObjectAction> => {
  if (!currentStage) {
    return;
  }

  // CD pipeline could publis artifacts without any stage
  // so, in case it doesn't have any stage
  // probably this is something wrong and somebody messed-up CR
  if (allStages.length === 0) {
    throw new Error('CD Pipeline should have at least one stage');
  }

  // we don't let user remove last stage
  if (allStages.length === 1) {
    return createKubeAction({
      name: RESOURCE_ACTIONS.DELETE,
      disabled: {
        status: true,
        reason: 'CD pipeline should have at least one stage',
      },
      icon: ICONS.BUCKET,
    });
  }

  const currentStageOrder = getStageOrder(currentStage);
  const otherStages = allStages.filter((el) => el.metadata.name !== currentStage.metadata.name);
  const highestOtherStagesOrder = Math.max(...otherStages.map(getStageOrder));

  if (currentStageOrder > highestOtherStagesOrder) {
    return await createKubeAction({
      item: new EDPCDPipelineStageKubeObject(currentStage) as unknown as KubeObjectInterface,
      authActionName: 'delete',
      name: RESOURCE_ACTIONS.DELETE,
      icon: ICONS.BUCKET,
      action: action,
    });
  }

  return await createKubeAction({
    item: new EDPCDPipelineStageKubeObject(currentStage) as unknown as KubeObjectInterface,
    authActionName: 'delete',
    name: RESOURCE_ACTIONS.DELETE,
    disabled: {
      status: true,
      reason: 'You are able to delete only the last stage',
    },
    icon: ICONS.BUCKET,
  });
};
