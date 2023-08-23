import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageDependencyTrackIntegrationSecretFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageDependencyTrackIntegrationSecretProps {
    formData: ManageDependencyTrackIntegrationSecretFormDataContext;
}

export type ManageDependencyTrackIntegrationSecretFormValues = FormValues<
    typeof DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES
>;
