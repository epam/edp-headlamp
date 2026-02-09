import { DialogProps } from '../../../providers/Dialog/types';

export interface SuccessGraphDialogProps
  extends DialogProps<{
    dialogTitle: string;
    title?: string;
    description?: string;
    goToLink: {
      routeName: string;
      text: string;
      routeParams: Record<string, string>;
    };
  }> {}
