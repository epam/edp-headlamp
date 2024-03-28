import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';

export interface DataContextProviderValue {
  gitServer: EDPGitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
}

export interface DataContextProviderProps {
  gitServer: EDPGitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
}
