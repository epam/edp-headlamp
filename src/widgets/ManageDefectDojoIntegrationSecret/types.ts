import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageDefectDojoIntegrationSecretFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageDefectDojoIntegrationSecretProps {
    formData: ManageDefectDojoIntegrationSecretFormDataContext;
}

export type ManageDefectDojoIntegrationSecretFormValues = FormValues<
    typeof DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES
>;
