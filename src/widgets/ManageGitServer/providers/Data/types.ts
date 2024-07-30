import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { GitServerKubeObjectInterface } from '../../../../k8s/groups/EDP/GitServer/types';

export interface DataContextProviderValue {
  gitServer: GitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
}

export interface DataContextProviderProps {
  gitServer: GitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
}
