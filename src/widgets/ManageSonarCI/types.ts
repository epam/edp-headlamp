import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageSonarIntegrationSecretFormDataContext {
  sonarSecret: SecretKubeObjectInterface;
  sonarEDPComponent: EDPComponentKubeObjectInterface;
  mode: ValueOf<typeof FORM_MODES>;
  ownerReference: string | undefined;
  handleClosePanel?: () => void;
}

export interface ManageSonarIntegrationSecretProps {
  formData: ManageSonarIntegrationSecretFormDataContext;
}

export type ManageSonarIntegrationSecretFormValues = FormValues<
  typeof SONAR_INTEGRATION_SECRET_FORM_NAMES
>;
