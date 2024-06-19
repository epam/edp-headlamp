import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { KubeObjectAction } from '../../../types/actions';
import { capitalizeFirstLetter } from '../../format/capitalizeFirstLetter';

export const createKubeAction = ({
  name,
  action,
  disabled = {
    status: false,
  },
  icon,
  isTextButton,
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
  isTextButton?: boolean;
}): KubeObjectAction => {
  return {
    name: name,
    label: capitalizeFirstLetter(name),
    icon,
    disabled: {
      status: disabled.status,
      reason: disabled.status && disabled.reason,
    },
    action: (e) => {
      e.stopPropagation();
      action();
    },
    isTextButton,
  };
};
