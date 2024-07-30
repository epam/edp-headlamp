import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { ValueOf } from '../../types/global';
import { PermissionSet } from '../../types/permissions';

export interface PipelineRunActionsMenuProps {
  data: {
    pipelineRun: PipelineRunKubeObjectInterface;
  };
  permissions: PermissionSet;
  backRoute?: string;
  variant?: ValueOf<typeof ACTION_MENU_TYPES>;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
}
