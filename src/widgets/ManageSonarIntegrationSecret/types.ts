import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageSonarIntegrationSecretFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageSonarIntegrationSecretProps {
    formData: ManageSonarIntegrationSecretFormDataContext;
}

export type ManageSonarIntegrationSecretFormValues = FormValues<
    typeof SONAR_INTEGRATION_SECRET_FORM_NAMES
>;
