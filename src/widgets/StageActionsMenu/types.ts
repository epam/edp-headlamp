import { ACTION_MENU_TYPES } from '../../constants/actionMenuTypes';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../k8s/EDPCDPipelineStage/types';
import { ValueOf } from '../../types/global';

export interface StageActionsMenuProps {
  data: {
    stage: EDPCDPipelineStageKubeObjectInterface;
    stages: EDPCDPipelineStageKubeObjectInterface[];
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
  };
  backRoute?: string;
  variant?: ValueOf<typeof ACTION_MENU_TYPES>;
  anchorEl?: HTMLElement;
  handleCloseResourceActionListMenu?: () => void;
}
