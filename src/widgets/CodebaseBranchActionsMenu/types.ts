import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../k8s/groups/EDP/CodebaseBranch/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { ValueOf } from '../../types/global';
import { widgetPermissionsToCheck } from './constants';

export interface CodebaseBranchActionsProps {
  data: {
    branch: CodebaseBranchKubeObjectInterface;
    defaultBranch: CodebaseBranchKubeObjectInterface;
    codebaseData: CodebaseKubeObjectInterface;
    pipelines: {
      review: string;
      build: string;
    };
  };
  backRoute?: string;
  variant?: ValueOf<typeof ACTION_MENU_TYPES>;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
}
