import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { RESOURCE_ACTION } from '../../../constants/resourceActions';
import { RESOURCE_LABEL_SELECTOR_PROTECTED } from '../../../k8s/common/labels';
import { KubeObjectAction } from '../../../types/actions';
import { ValueOf } from '../../../types/global';

type ProtectedAction = 'update' | 'delete';
type ProtectedState = Record<ProtectedAction, { status: boolean; reason: string } | false>;
type DisabledValue = { status: boolean; reason: string };

const getDisabledProtectedState = (protectedLabel: string): ProtectedState => {
  const actions = protectedLabel.split('-');

  return actions.reduce<ProtectedState>(
    (acc, cur) => {
      switch (cur) {
        case 'update':
          acc.update = {
            status: true,
            reason: 'This resource is protected from updates.',
          };
          break;
        case 'delete':
          acc.delete = {
            status: true,
            reason: 'This resource is protected from deletion.',
          };
          break;
      }

      return acc;
    },
    {
      update: false,
      delete: false,
    }
  );
};

const getDisabledState = (
  item: KubeObjectInterface,
  disabledDefaultValue: DisabledValue,
  actionType: ValueOf<typeof RESOURCE_ACTION>
) => {
  const isProtected = item?.metadata?.labels?.[RESOURCE_LABEL_SELECTOR_PROTECTED];

  if (!isProtected) {
    return {
      status: disabledDefaultValue.status,
      reason: disabledDefaultValue.status ? disabledDefaultValue.reason : undefined,
    };
  }

  const protectedDisabledState = getDisabledProtectedState(isProtected);

  const _actionType: ProtectedAction =
    actionType === RESOURCE_ACTION.EDIT ? 'update' : (actionType as ProtectedAction); //because of the different naming

  return protectedDisabledState[_actionType] || disabledDefaultValue;
};

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
  type: ValueOf<typeof RESOURCE_ACTION>;
  label: string;
  callback?: (item: Item) => void;
  disabled?: DisabledValue;
  icon?: string;
  isTextButton?: boolean;
}): KubeObjectAction => {
  return {
    name: type,
    label,
    icon,
    disabled: getDisabledState(item, disabled, type),
    action: (e) => {
      e.stopPropagation();
      if (callback) {
        callback(item);
      }
    },
    isTextButton,
  };
};
