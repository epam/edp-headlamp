import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../../../types/forms';
import { ValueOf } from '../../../../types/global';
import { CREDENTIALS_FORM_NAME } from './names';

export type CredentialsFormValues = FormValues<typeof CREDENTIALS_FORM_NAME>;

export interface CredentialsFormProps {
  mode: ValueOf<typeof FORM_MODES>;
  gitServerSecret: SecretKubeObjectInterface;
  formRef: React.MutableRefObject<HTMLFormElement>;
}
