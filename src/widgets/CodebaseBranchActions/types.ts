import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { ValueOf } from '../../types/global';
import { PermissionSet } from '../../types/permissions';

export interface CodebaseBranchActionsProps {
  data: {
    branch: EDPCodebaseBranchKubeObjectInterface;
    defaultBranch: string;
    codebaseData: EDPCodebaseKubeObjectInterface;
  };
  backRoute?: string;
  variant?: ValueOf<typeof ACTION_MENU_TYPES>;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionSet;
}
