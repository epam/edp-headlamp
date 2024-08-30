import { DialogProps } from '../../../providers/Dialog/types';

export interface PodsTerminalDialogProps
  extends DialogProps<{
    stageNamespace: string;
    appName: string;
    isAttach?: boolean;
  }> {}
