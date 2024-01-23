import { KubeObjectAction } from '../../../types/actions';
import { capitalizeFirstLetter } from '../../format/capitalizeFirstLetter';

export const createKubeAction = ({
  name,
  action,
  disabled = {
    status: false,
  },
  icon,
}: {
  name: string;
  action?: () => void;
  disabled?: {
    status: boolean;
    reason?: string;
  };
  icon?: string;
}): KubeObjectAction => {
  const nameInLowerCase = name.toLowerCase();

  return {
    name: nameInLowerCase,
    label: capitalizeFirstLetter(nameInLowerCase),
    icon,
    disabled,
    action: e => {
      e.stopPropagation();
      action();
    },
  };
};
