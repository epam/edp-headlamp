import { QuickLinkKubeObjectInterface } from '../../k8s/QuickLink/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { FORM_NAMES } from './constants';
import { INTEGRATION_SECRET_FORM_NAMES, QUICK_LINK_FORM_NAMES } from './names';

export type FormNames = ValueOf<typeof FORM_NAMES>;

export interface ManageCodeMieProps {
  secret: SecretKubeObjectInterface;
  quickLink: QuickLinkKubeObjectInterface;
  mode: ValueOf<typeof FORM_MODES>;
  ownerReference: string | undefined;
  handleClosePanel?: () => void;
}

export type QuickLinkFormValues = FormValues<typeof QUICK_LINK_FORM_NAMES>;

export type IntegrationSecretFormValues = FormValues<typeof INTEGRATION_SECRET_FORM_NAMES>;
