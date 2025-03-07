import { ActionMenuType } from '../../constants/actionMenuTypes';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { widgetPermissionsToCheck } from './constants';

export interface PipelineRunActionsMenuProps {
  data: {
    pipelineRun: PipelineRunKubeObjectInterface;
  };
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
  backRoute?: string;
  variant?: ActionMenuType;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
}
