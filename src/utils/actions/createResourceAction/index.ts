import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { RESOURCE_ACTIONS } from '../../../constants/resourceActions';
import { RESOURCE_LABEL_SELECTOR_PROTECTED } from '../../../k8s/common/labels';
import { KubeObjectAction } from '../../../types/actions';
import { ValueOf } from '../../../types/global';

export const createResourceAction = <Item extends KubeObjectInterface>({
  item,
  type,
  label,
  callback,
  disabled = {
    status: false,
    reason: 'You cannot perform this action.',
  },
  icon,
  isTextButton,
}: {
  item: Item;
  type: ValueOf<typeof RESOURCE_ACTIONS>;
  label: string;
  callback?: (item: Item) => void;
  disabled?: {
    status: boolean;
    reason?: string;
  };
  icon?: string;
  isTextButton?: boolean;
}): KubeObjectAction => {
  const isProtected = item?.metadata?.labels?.[RESOURCE_LABEL_SELECTOR_PROTECTED] === 'true';
  const isDeleteAction = type === RESOURCE_ACTIONS.DELETE;

  return {
    name: type,
    label,
    icon,
    disabled:
      isProtected && isDeleteAction
        ? {
            status: true,
            reason: 'This resource is protected from deletion.',
          }
        : {
            status: disabled.status,
            reason: disabled.status && disabled.reason,
          },
    action: (e) => {
      e.stopPropagation();
      callback(item);
    },
    isTextButton,
  };
};
