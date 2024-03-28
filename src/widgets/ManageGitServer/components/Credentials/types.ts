import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { FORM_MODES } from '../../../../types/forms';
import { ValueOf } from '../../../../types/global';

export interface CredentialsFormProps {
  mode: ValueOf<typeof FORM_MODES>;
  gitServerSecret: SecretKubeObjectInterface;
}
