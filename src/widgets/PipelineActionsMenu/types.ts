import { ActionMenuType } from '../../constants/actionMenuTypes';
import { PipelineKubeObjectInterface } from '../../k8s/groups/Tekton/Pipeline/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { widgetPermissionsToCheck } from './constants';

export interface PipelineActionsMenuProps {
  data: {
    pipeline: PipelineKubeObjectInterface;
  };
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
  backRoute?: string;
  variant?: ActionMenuType;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
}
