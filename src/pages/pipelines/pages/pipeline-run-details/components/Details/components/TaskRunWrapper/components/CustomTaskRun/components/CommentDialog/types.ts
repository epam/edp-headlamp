import { DialogProps } from '../../../../../../../../../../../../providers/Dialog/types';

export interface CommentDialogProps
  extends DialogProps<{
    onFormSubmit: (comment: string) => void;
    title: string;
  }> {}
