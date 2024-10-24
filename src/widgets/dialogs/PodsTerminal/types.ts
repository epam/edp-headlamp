import { PodKubeObjectInterface } from '../../../k8s/groups/default/Pod/types';
import { DialogProps } from '../../../providers/Dialog/types';

export interface PodsTerminalDialogProps
  extends DialogProps<{
    pods: PodKubeObjectInterface[];
    isAttach?: boolean;
  }> {}
