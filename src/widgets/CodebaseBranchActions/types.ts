import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../k8s/groups/EDP/CodebaseBranch/types';
import { ValueOf } from '../../types/global';
import { PermissionSet } from '../../types/permissions';

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
  permissions: PermissionSet;
}
