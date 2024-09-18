import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/groups/default/Secret/config';
import { CodemieKubeObject } from '../../../../k8s/groups/EDP/Codemie';
import { CodemieKubeObjectConfig } from '../../../../k8s/groups/EDP/Codemie/config';
import { QuickLinkKubeObject } from '../../../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../../../k8s/groups/EDP/QuickLink/config';
import { PageDescription } from '../../../../types/pages';
import { routeCodemie } from './route';

export const pageDescription: PageDescription = {
  id: 'codemie-integration',
  label: 'CodeMie',
  description: 'Configure CodeMie integration.',
  routePath: routeCodemie.path,
};

export const pagePermissionsToCheck = {
  create: [
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: CodemieKubeObject, config: CodemieKubeObjectConfig },
  ],
  update: [
    { instance: SecretKubeObject, config: SecretKubeObjectConfig },
    { instance: CodemieKubeObject, config: CodemieKubeObjectConfig },
    { instance: QuickLinkKubeObject, config: QuickLinkKubeObjectConfig },
  ],
  delete: [{ instance: SecretKubeObject, config: SecretKubeObjectConfig }],
};
