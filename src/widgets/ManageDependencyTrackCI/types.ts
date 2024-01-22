import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageDependencyTrackIntegrationSecretFormDataContext {
    dependencyTrackSecret: SecretKubeObjectInterface;
    depTrackEDPComponent: EDPComponentKubeObjectInterface;
    mode: ValueOf<typeof FORM_MODES>;
    ownerReference: string | undefined;
    handleClosePanel?: () => void;
}

export interface ManageDependencyTrackIntegrationSecretProps {
    formData: ManageDependencyTrackIntegrationSecretFormDataContext;
}

export type ManageDependencyTrackIntegrationSecretFormValues = FormValues<
    typeof DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES
>;
