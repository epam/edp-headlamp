import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';

export interface CredentialsFormProps {
  gitServerSecret: SecretKubeObjectInterface;
}
