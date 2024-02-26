import { QuickLinkKubeObjectInterface } from '../../k8s/QuickLink/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { ARGOCD_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageArgoCDIntegrationSecretFormDataContext {
  argoCDSecret: SecretKubeObjectInterface;
  argoCDQuickLink: QuickLinkKubeObjectInterface;
  mode: ValueOf<typeof FORM_MODES>;
  ownerReference: string | undefined;
  handleClosePanel?: () => void;
}

export interface ManageArgoCDIntegrationSecretProps {
  formData: ManageArgoCDIntegrationSecretFormDataContext;
}

export type ManageArgoCDIntegrationSecretFormValues = FormValues<
  typeof ARGOCD_INTEGRATION_SECRET_FORM_NAMES
>;
