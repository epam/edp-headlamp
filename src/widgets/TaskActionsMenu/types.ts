import { ActionMenuType } from '../../constants/actionMenuTypes';
import { TaskKubeObjectInterface } from '../../k8s/groups/Tekton/Task/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { widgetPermissionsToCheck } from './constants';

export interface TaskActionsMenuProps {
  data: {
    task: TaskKubeObjectInterface;
  };
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
  backRoute?: string;
  variant?: ActionMenuType;
  anchorEl?: HTMLElement | null;
  handleCloseResourceActionListMenu?: () => void;
}
