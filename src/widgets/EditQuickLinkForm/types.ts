import { QuickLinkKubeObjectInterface } from '../../k8s/QuickLink/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { QUICK_LINK_FORM_NAMES } from './names';

export interface EditQuickLinkFormProps {
  QuickLink: QuickLinkKubeObjectInterface;
}

export interface ManageQuickLinkDataContext {
  QuickLink?: QuickLinkKubeObjectInterface;
  mode: ValueOf<typeof FORM_MODES>;
  isSystem: boolean;
  handleApply?: ({ QuickLinkData }: { QuickLinkData: QuickLinkKubeObjectInterface }) => void;
}

export type ManageQuickLinkValues = FormValues<typeof QUICK_LINK_FORM_NAMES>;
