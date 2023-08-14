import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { REGISTRY_SECRET_FORM_NAMES } from './names';

export interface ManageRegistrySecretFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    secrets: SecretKubeObjectInterface[];
    registryEndpoint: string;
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageRegistrySecretProps {
    formData: ManageRegistrySecretFormDataContext;
}

export type ManageRegistrySecretFormValues = FormValues<typeof REGISTRY_SECRET_FORM_NAMES>;
