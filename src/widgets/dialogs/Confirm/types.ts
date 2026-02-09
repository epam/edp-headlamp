import { DialogProps } from '../../../providers/Dialog/types';

export interface ConfirmDialogProps
  extends DialogProps<{
    actionCallback: () => Promise<void>;
    text: string;
  }> {}
