import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { ValueOf } from '../../types/global';
import { widgetPermissionsToCheck } from './constants';

export interface PipelineRunActionsMenuProps {
  data: {
    pipelineRun: PipelineRunKubeObjectInterface;
  };
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
  backRoute?: string;
  variant?: ValueOf<typeof ACTION_MENU_TYPES>;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
}
