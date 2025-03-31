import { ActionMenuType } from '../../constants/actionMenuTypes';
import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../k8s/groups/EDP/CodebaseBranch/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
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
  variant?: ActionMenuType;
  anchorEl?: HTMLElement | null;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
}
