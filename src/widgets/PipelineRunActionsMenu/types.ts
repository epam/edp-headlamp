import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { PipelineRunKubeObjectInterface } from '../../k8s/PipelineRun/types';
import { ValueOf } from '../../types/global';

export interface PipelineRunActionsMenuProps {
  data: {
    pipelineRun: PipelineRunKubeObjectInterface;
  };
  backRoute?: string;
  variant?: ValueOf<typeof ACTION_MENU_TYPES>;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
}
