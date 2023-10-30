import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { CLUSTER_CREATION_FORM_NAMES } from './names';

export interface ManageClusterSecretDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    handleClosePlaceholder?: () => void;
}

export interface ManageClusterSecretProps {
    formData: ManageClusterSecretDataContext;
}

export type ManageClusterSecretValues = FormValues<typeof CLUSTER_CREATION_FORM_NAMES>;
