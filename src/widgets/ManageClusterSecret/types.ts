import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { CLUSTER_CREATION_FORM_NAMES } from './names';

export interface ManageClusterSecretDataContext {
    handleClosePlaceholder?: () => void;
    mode: ValueOf<typeof FORM_MODES>;
    currentElement?: SecretKubeObjectInterface;
}

export interface ManageClusterSecretProps {
    formData: ManageClusterSecretDataContext;
}

export type ManageClusterSecretValues = FormValues<typeof CLUSTER_CREATION_FORM_NAMES>;
