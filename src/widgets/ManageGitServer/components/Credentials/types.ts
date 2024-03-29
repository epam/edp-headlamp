import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';

export interface CredentialsFormProps {
  gitServerSecret: SecretKubeObjectInterface;
}
