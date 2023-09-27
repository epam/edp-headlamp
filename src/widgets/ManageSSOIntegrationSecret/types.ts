import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { SSO_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageSSOIntegrationSecretFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageSSOIntegrationSecretProps {
    formData: ManageSSOIntegrationSecretFormDataContext;
}

export type ManageSSOIntegrationSecretFormValues = FormValues<
    typeof SSO_INTEGRATION_SECRET_FORM_NAMES
>;
