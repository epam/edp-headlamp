import { SecretKubeObjectInterface } from '../../../../../../k8s/groups/default/Secret/types';
import { CodemieKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codemie/types';
import { CodemieApplicationKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodemieApplication/types';
import { CodemieProjectKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodemieProject/types';
import { CodemieProjectSettingsKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodemieProjectSettings/types';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/groups/EDP/QuickLink/types';
import { DataProviderValue } from '../../../../../../types/pages';

export interface DynamicDataContextProviderValue {
  codemie: DataProviderValue<CodemieKubeObjectInterface | null | undefined>;
  codemieProject: DataProviderValue<CodemieProjectKubeObjectInterface | null | undefined>;
  codemieProjectSettings: DataProviderValue<CodemieProjectSettingsKubeObjectInterface[] | null>;
  codemieApplications: DataProviderValue<CodemieApplicationKubeObjectInterface[] | null>;
  codemieSecret: DataProviderValue<SecretKubeObjectInterface | null | undefined>;
  codemieQuickLink: DataProviderValue<QuickLinkKubeObjectInterface | null | undefined>;
}
