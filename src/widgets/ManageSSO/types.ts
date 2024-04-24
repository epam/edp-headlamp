import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { SSO_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageSSOIntegrationSecretFormDataContext {
  ssoSecret: SecretKubeObjectInterface;
  ownerReference: string | undefined;
  isReadOnly: boolean;
  mode: ValueOf<typeof FORM_MODES>;
  handleClosePanel?: () => void;
}

export interface ManageSSOIntegrationSecretProps {
  formData: ManageSSOIntegrationSecretFormDataContext;
}

export type ManageSSOIntegrationSecretFormValues = FormValues<
  typeof SSO_INTEGRATION_SECRET_FORM_NAMES
>;
