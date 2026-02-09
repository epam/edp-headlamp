import { PodKubeObjectInterface } from '../../../k8s/groups/default/Pod/types';
import { DialogProps } from '../../../providers/Dialog/types';

export interface PodsLogViewerDialogProps
  extends DialogProps<{
    pods: PodKubeObjectInterface[];
  }> {}
