import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { ValueOf } from '../../types/global';
import { PermissionSet } from '../../types/permissions';

export interface CDPipelineActionsMenuProps {
  data: {
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
  };
  backRoute?: string;
  variant?: ValueOf<typeof ACTION_MENU_TYPES>;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionSet;
}
