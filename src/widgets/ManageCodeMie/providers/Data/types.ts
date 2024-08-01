import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { CodemieKubeObjectInterface } from '../../../../k8s/groups/EDP/Codemie/types';
import { CodemieProjectKubeObjectInterface } from '../../../../k8s/groups/EDP/CodemieProject/types';
import { CodemieProjectSettingsKubeObjectInterface } from '../../../../k8s/groups/EDP/CodemieProjectSettings/types';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';

export interface DataContextProviderValue {
  quickLink: QuickLinkKubeObjectInterface;
  codemie: CodemieKubeObjectInterface;
  codemieSecret: SecretKubeObjectInterface;
  codemieProject: CodemieProjectKubeObjectInterface;
  codemieProjectSettings: CodemieProjectSettingsKubeObjectInterface;
  codemieProjectSettingsSecret: SecretKubeObjectInterface;
  handleClosePanel?: () => void;
}

export interface DataContextProviderProps {
  quickLink: QuickLinkKubeObjectInterface;
  codemie: CodemieKubeObjectInterface;
  codemieSecret: SecretKubeObjectInterface;
  codemieProject: CodemieProjectKubeObjectInterface;
  codemieProjectSettings: CodemieProjectSettingsKubeObjectInterface;
  codemieProjectSettingsSecret: SecretKubeObjectInterface;
  handleClosePanel?: () => void;
}
