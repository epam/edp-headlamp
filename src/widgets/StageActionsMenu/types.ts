import { ActionMenuType } from '../../constants/actionMenuTypes';
import { CDPipelineKubeObjectInterface } from '../../k8s/groups/EDP/CDPipeline/types';
import { StageKubeObjectInterface } from '../../k8s/groups/EDP/Stage/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { widgetPermissionsToCheck } from './constants';

export interface StageActionsMenuProps {
  data: {
    stage: StageKubeObjectInterface;
    stages: StageKubeObjectInterface[];
    CDPipelineData: CDPipelineKubeObjectInterface;
  };
  backRoute?: string;
  variant?: ActionMenuType;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
}
