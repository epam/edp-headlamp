import { ServiceAccountKubeObjectInterface } from '../../k8s/ServiceAccount/types';
import { FormValues } from '../../types/forms';
import { ECR_SERVICE_ACCOUNT_FORM_NAMES } from './names';

export interface ManageECRServiceAccountFormDataContext {
    currentElement: ServiceAccountKubeObjectInterface;
    registryEndpoint: string;
    handleClosePlaceholder?: () => void;
}

export interface ManageECRServiceAccountProps {
    formData: ManageECRServiceAccountFormDataContext;
}

export type ManageECRServiceAccountFormValues = FormValues<typeof ECR_SERVICE_ACCOUNT_FORM_NAMES>;
