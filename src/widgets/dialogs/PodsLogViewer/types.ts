import { DialogProps } from '../../../providers/Dialog/types';

export interface PodsLogViewerDialogProps
  extends DialogProps<{
    stageNamespace: string;
    appName: string;
  }> {}
