import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { CDPipelineKubeObjectInterface } from '../../k8s/groups/EDP/CDPipeline/types';
import { ValueOf } from '../../types/global';
import { PermissionSet } from '../../types/permissions';

export interface CDPipelineActionsMenuProps {
  data: {
    CDPipelineData: CDPipelineKubeObjectInterface;
  };
  backRoute?: string;
  variant?: ValueOf<typeof ACTION_MENU_TYPES>;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionSet;
}
