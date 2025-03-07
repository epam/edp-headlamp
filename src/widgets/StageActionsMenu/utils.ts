import { RESOURCE_ACTION } from '../../constants/resourceActions';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { RESOURCE_LABEL_SELECTOR_PROTECTED } from '../../k8s/common/labels';
import { StageKubeObjectInterface } from '../../k8s/groups/EDP/Stage/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { KubeObjectAction } from '../../types/actions';
import { createResourceAction } from '../../utils/actions/createResourceAction';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
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
  action: (StageKubeObjectInterface) => void;
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
}): Promise<KubeObjectAction> => {
  if (!currentStage) {
    return;
  }

  const isProtected =
    currentStage?.metadata?.labels?.[RESOURCE_LABEL_SELECTOR_PROTECTED] === 'true';

  // CD pipeline could publis artifacts without any stage
  // so, in case it doesn't have any stage
  // probably this is something wrong and somebody messed-up CR
  if (allStages.length === 0) {
    throw new Error('Deployment Flow should have at least one Environment');
  }

  // we don't let user remove last stage
  if (allStages.length === 1) {
    return createResourceAction({
      type: RESOURCE_ACTION.DELETE,
      label: capitalizeFirstLetter(RESOURCE_ACTION.DELETE),
      item: currentStage,
      icon: ICONS.BUCKET,
      disabled: {
        status: true,
        reason: 'Deployment Flow should have at least one Environment',
      },
    });
  }

  const currentStageOrder = getStageOrder(currentStage);
  const otherStages = allStages.filter((el) => el.metadata.name !== currentStage.metadata.name);
  const highestOtherStagesOrder = Math.max(...otherStages.map(getStageOrder));

  const deleteActionDisabled = isProtected
    ? {
        status: true,
        reason: 'This resource is protected from deletion.',
      }
    : {
        status: !permissions?.delete?.Stage.allowed,
        reason: permissions?.delete?.Stage.reason,
      };

  if (currentStageOrder > highestOtherStagesOrder) {
    return createResourceAction({
      type: RESOURCE_ACTION.DELETE,
      label: capitalizeFirstLetter(RESOURCE_ACTION.DELETE),
      item: currentStage,
      icon: ICONS.BUCKET,
      disabled: deleteActionDisabled,
      callback: (stage) => action(stage),
    });
  }

  return await createResourceAction({
    type: RESOURCE_ACTION.DELETE,
    label: capitalizeFirstLetter(RESOURCE_ACTION.DELETE),
    item: currentStage,
    icon: ICONS.BUCKET,
    disabled: {
      status: true,
      reason: 'You are able to delete only the last Environment',
    },
  });
};
