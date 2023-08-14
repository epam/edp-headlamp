import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageNexusIntegrationSecretFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageNexusIntegrationSecretProps {
    formData: ManageNexusIntegrationSecretFormDataContext;
}

export type ManageNexusIntegrationSecretFormValues = FormValues<
    typeof NEXUS_INTEGRATION_SECRET_FORM_NAMES
>;
