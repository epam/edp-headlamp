import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { ARGOCD_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageArgoCDIntegrationSecretFormDataContext {
    argoCDSecret: SecretKubeObjectInterface;
    argoCDEDPComponent: EDPComponentKubeObjectInterface;
    mode: ValueOf<typeof FORM_MODES>;
    ownerReference: string | undefined;
    handleClosePanel?: () => void;
}

export interface ManageArgoCDIntegrationSecretProps {
    formData: ManageArgoCDIntegrationSecretFormDataContext;
}

export type ManageArgoCDIntegrationSecretFormValues = FormValues<
    typeof ARGOCD_INTEGRATION_SECRET_FORM_NAMES
>;
