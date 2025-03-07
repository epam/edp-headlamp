import { ActionMenuType } from '../../constants/actionMenuTypes';
import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { widgetPermissionsToCheck } from './constants';

export interface CodebaseActionsMenuProps {
  data: {
    codebaseData: CodebaseKubeObjectInterface;
  };
  backRoute?: string;
  variant?: ActionMenuType;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
}
