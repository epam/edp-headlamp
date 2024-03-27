import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';

export interface ManageGitServerProps {
  gitServer: EDPGitServerKubeObjectInterface;
  repositorySecrets: SecretKubeObjectInterface[];
  handleClosePanel: () => void;
}
