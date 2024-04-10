import { ICONS } from '../../icons/iconify-icons-mapping';
import { PageDescription } from '../../types/pages';
import { ARGOCD_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-argocd-integration/constants';
import { CLUSTER_LIST_PAGE_DESCRIPTION } from './pages/edp-cluster-list/constants';
import { DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-defect-dojo-integration/constants';
import { DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-dependency-track-integration/constants';
import { GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION } from './pages/edp-gitops/constants';
import { GIT_SERVER_LIST_PAGE_DESCRIPTION } from './pages/edp-gitserver-list/constants';
import { JIRA_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-jira-integration/constants';
import { NEXUS_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-nexus-integration/constants';
import { QUICK_LINK_LIST_PAGE_DESCRIPTION } from './pages/edp-quick-link-list/constants';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './pages/edp-registry-list/constants';
import { SONAR_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-sonar-integration/constants';
import { SSO_INTEGRATION_PAGE_DESCRIPTION } from './pages/edp-sso-integration/constants';

export interface SubMenuGroup {
  id: string;
  label: string;
  icon: string;
  children: PageDescription[];
}

export const menu: SubMenuGroup[] = [
  {
    id: 'quick-access',
    label: 'Quick Access',
    icon: ICONS.LIGHTNING_BOLT,
    children: [QUICK_LINK_LIST_PAGE_DESCRIPTION],
  },
  {
    id: 'artifacts-storage',
    label: 'Artifacts Storage',
    icon: ICONS.STORAGE,
    children: [NEXUS_INTEGRATION_PAGE_DESCRIPTION, REGISTRY_LIST_PAGE_DESCRIPTION],
  },
  {
    id: 'deployment',
    label: 'Deployment',
    icon: ICONS.ROCKET_ROUNDED,
    children: [
      CLUSTER_LIST_PAGE_DESCRIPTION,
      GIT_OPS_CONFIGURATION_PAGE_DESCRIPTION,
      ARGOCD_INTEGRATION_PAGE_DESCRIPTION,
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: ICONS.SECURITY,
    children: [
      DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION,
      DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION,
    ],
  },
  {
    id: 'code-quality',
    label: 'Code Quality',
    icon: ICONS.CUP,
    children: [SONAR_INTEGRATION_PAGE_DESCRIPTION],
  },
  {
    id: 'version-control',
    label: 'Version Control System',
    icon: ICONS.LAYERS,
    children: [GIT_SERVER_LIST_PAGE_DESCRIPTION],
  },
  {
    id: 'management-tool',
    label: 'Management Tool',
    icon: ICONS.TOOLS,
    children: [JIRA_INTEGRATION_PAGE_DESCRIPTION],
  },
  {
    id: 'access',
    label: 'Access',
    icon: ICONS.KEY,
    children: [SSO_INTEGRATION_PAGE_DESCRIPTION],
  },
];
