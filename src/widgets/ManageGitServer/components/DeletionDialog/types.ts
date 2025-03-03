import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { GitServerKubeObjectInterface } from '../../../../k8s/groups/EDP/GitServer/types';

export interface DeletionDialogProps {
  gitServer: GitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
  open: boolean;
  handleClose: () => void;
}
