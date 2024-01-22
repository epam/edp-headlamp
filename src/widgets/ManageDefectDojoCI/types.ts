import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageDefectDojoIntegrationSecretFormDataContext {
    defectDojoSecret: SecretKubeObjectInterface;
    defectDojoEDPComponent: EDPComponentKubeObjectInterface;
    mode: ValueOf<typeof FORM_MODES>;
    ownerReference: string | undefined;
    handleClosePanel?: () => void;
}

export interface ManageDefectDojoIntegrationSecretProps {
    formData: ManageDefectDojoIntegrationSecretFormDataContext;
}

export type ManageDefectDojoIntegrationSecretFormValues = FormValues<
    typeof DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES
>;
