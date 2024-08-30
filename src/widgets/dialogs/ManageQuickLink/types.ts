import { QuickLinkKubeObjectInterface } from '../../../k8s/groups/EDP/QuickLink/types';
import { DialogProps } from '../../../providers/Dialog/types';
import { FormValues } from '../../../types/forms';
import { QUICK_LINK_FORM_NAMES } from './names';

export interface ManageQuickLinkDialogProps
  extends DialogProps<{
    quickLink?: QuickLinkKubeObjectInterface;
    isSystem?: boolean;
    handleApply?: ({ quickLinkData }: { quickLinkData: QuickLinkKubeObjectInterface }) => void;
  }> {}

export type ManageQuickLinkFormValues = FormValues<typeof QUICK_LINK_FORM_NAMES>;
