import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { DOCKERHUB_REGISTRY_SECRET_FORM_NAMES } from './names';

export interface ManageDockerHubRegistryFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    secrets: SecretKubeObjectInterface[];
    registryEndpoint: string;
    registrySpace: string;
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageDockerHubRegistryProps {
    formData: ManageDockerHubRegistryFormDataContext;
}

export type ManageDockerHubRegistryFormValues = FormValues<
    typeof DOCKERHUB_REGISTRY_SECRET_FORM_NAMES
>;
