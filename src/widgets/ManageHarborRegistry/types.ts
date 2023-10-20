import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { HARBOR_REGISTRY_SECRET_FORM_NAMES } from './names';

export interface ManageHarborRegistryFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    secrets: SecretKubeObjectInterface[];
    registryEndpoint: string;
    registrySpace: string;
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageHarborRegistryProps {
    formData: ManageHarborRegistryFormDataContext;
}

export type ManageHarborRegistryFormValues = FormValues<typeof HARBOR_REGISTRY_SECRET_FORM_NAMES>;
