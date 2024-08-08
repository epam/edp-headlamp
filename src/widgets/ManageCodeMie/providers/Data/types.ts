import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { CodemieKubeObjectInterface } from '../../../../k8s/groups/EDP/Codemie/types';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';

export interface DataContextProviderValue {
  quickLink: QuickLinkKubeObjectInterface;
  codemie: CodemieKubeObjectInterface;
  codemieSecret: SecretKubeObjectInterface;
  handleClosePanel?: () => void;
}

export interface DataContextProviderProps {
  quickLink: QuickLinkKubeObjectInterface;
  codemie: CodemieKubeObjectInterface;
  codemieSecret: SecretKubeObjectInterface;
  handleClosePanel?: () => void;
}
