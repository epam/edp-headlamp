import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../k8s/ServiceAccount/types';
import { FormValues } from '../../types/forms';
import { ECR_REGISTRY_FORM_NAMES } from './names';

export interface ManageECRRegistryFormDataContext {
    currentElement: 'placeholder' | SecretKubeObjectInterface;
    secrets: SecretKubeObjectInterface[];
    registryEndpoint: string;
    registrySpace: string;
    irsaRoleArn: string;
    tektonServiceAccount: ServiceAccountKubeObjectInterface;
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageECRRegistryProps {
    formData: ManageECRRegistryFormDataContext;
}

export type ManageECRRegistryFormValues = FormValues<typeof ECR_REGISTRY_FORM_NAMES>;
