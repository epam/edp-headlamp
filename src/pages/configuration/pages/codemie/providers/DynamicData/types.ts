import { SecretKubeObjectInterface } from '../../../../../../k8s/groups/default/Secret/types';
import { CodemieKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codemie/types';
import { CodemieProjectKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodemieProject/types';
import { CodemieProjectSettingsKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodemieProjectSettings/types';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/groups/EDP/QuickLink/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface DynamicDataContextProviderValue {
  codemie: DataProviderValue<CodemieKubeObjectInterface[]>;
  codemieProject: DataProviderValue<CodemieProjectKubeObjectInterface[]>;
  codemieProjectSettings: DataProviderValue<CodemieProjectSettingsKubeObjectInterface[]>;
  codemieSecret: DataProviderValue<SecretKubeObjectInterface>;
  codemieQuickLink: DataProviderValue<QuickLinkKubeObjectInterface>;
}
