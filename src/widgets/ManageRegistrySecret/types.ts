import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormData } from '../../types/forms';
import { REGISTRY_SECRET_CREATION_FORM_NAMES } from './names';

export interface ManageRegistrySecretFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    secrets: SecretKubeObjectInterface[];
    registryEndpoint: string;
    handleDeleteRow: (isPlaceholder: boolean) => void;
}

export interface ManageRegistrySecretProps {
    formData: ManageRegistrySecretFormDataContext;
    formMode: 'create' | 'edit';
}

export type ManageRegistrySecretFormNames = FormData<typeof REGISTRY_SECRET_CREATION_FORM_NAMES>;
