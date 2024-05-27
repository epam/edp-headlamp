import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { KubeObjectAction } from '../../../types/actions';
import { capitalizeFirstLetter } from '../../format/capitalizeFirstLetter';

export const createKubeAction = async ({
  item,
  name,
  actionCheckName,
  action,
  disabled = {
    status: false,
  },
  icon,
}: {
  name: string;
  item?: KubeObjectInterface;
  actionCheckName?: string;
  action?: () => void;
  disabled?: {
    status: boolean;
    reason?: string;
  };
  icon?: string;
}): Promise<KubeObjectAction> => {
  if (!actionCheckName || !Object.keys(item?.jsonData).length) {
    return {
      name: name,
      label: capitalizeFirstLetter(name),
      icon,
      disabled: {
        status: disabled.status,
        reason: disabled.reason,
      },
      action: (e) => {
        e.stopPropagation();
        action();
      },
    };
  }

  const actionCheckResult = await item.getAuthorization(actionCheckName);

  const allowed = actionCheckResult.status?.allowed;

  return {
    name: name,
    label: capitalizeFirstLetter(name),
    icon,
    disabled: {
      status: disabled.status || !allowed,
      reason: disabled.reason || 'Forbidden',
    },
    action: (e) => {
      e.stopPropagation();
      action();
    },
  };
};
