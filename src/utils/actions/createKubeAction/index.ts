import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { KubeObjectAction } from '../../../types/actions';
import { capitalizeFirstLetter } from '../../format/capitalizeFirstLetter';

export const createKubeAction = async ({
  item,
  name,
  authActionName,
  action,
  disabled = {
    status: false,
  },
  icon,
}: {
  name: string;
  item?: KubeObjectInterface;
  authActionName?: string;
  action?: () => void;
  disabled?: {
    status: boolean;
    reason?: string;
  };
  icon?: string;
}): Promise<KubeObjectAction> => {

  if (!authActionName || !Object.keys(item.jsonData).length) {
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

  const authCheckResult = await item.getAuthorization(authActionName);

  const allowed = authCheckResult.status?.allowed;

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
