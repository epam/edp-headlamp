import { ICONS } from '../../icons/iconify-icons-mapping';
import { PageDescription } from '../../types/pages';
import { pageDescription as argoCDPageDescription } from './pages/argocd/constants';
import { pageDescription as chatAssistantPageDescription } from './pages/chat-assistant/constants';
import { pageDescription as clustersPageDescription } from './pages/clusters/constants';
import { pageDescription as codemiePageDescription } from './pages/codemie/constants';
import { pageDescription as defectDojoPageDescription } from './pages/defect-dojo/constants';
import { pageDescription as dependencyTrackPageDescription } from './pages/dependency-track/constants';
import { pageDescription as gitOpsPageDescription } from './pages/gitops/constants';
import { pageDescription as gitServersPageDescription } from './pages/gitservers/constants';
import { pageDescription as jiraPageDescription } from './pages/jira/constants';
import { pageDescription as nexusPageDescription } from './pages/nexus/constants';
import { pageDescription as pipelinesPageDescription } from './pages/pipeline-list/constants';
import { pageDescription as quickLinksPageDescription } from './pages/quicklinks/constants';
import { pageDescription as registryPageDescription } from './pages/registry/constants';
import { pageDescription as sonarPageDescription } from './pages/sonar/constants';
import { pageDescription as tasksPageDescription } from './pages/task-list/constants';

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
    children: [quickLinksPageDescription],
  },
  {
    id: 'tekton',
    label: 'Tekton',
    icon: ICONS.TEKTON,
    children: [pipelinesPageDescription, tasksPageDescription],
  },
  {
    id: 'artifacts-storage',
    label: 'Artifacts Storage',
    icon: ICONS.STORAGE,
    children: [nexusPageDescription, registryPageDescription],
  },
  {
    id: 'deployment',
    label: 'Deployment',
    icon: ICONS.ROCKET_ROUNDED,
    children: [clustersPageDescription, gitOpsPageDescription, argoCDPageDescription],
  },
  {
    id: 'security',
    label: 'Security',
    icon: ICONS.SECURITY,
    children: [defectDojoPageDescription, dependencyTrackPageDescription],
  },
  {
    id: 'code-quality',
    label: 'Code Quality',
    icon: ICONS.CUP,
    children: [sonarPageDescription],
  },
  {
    id: 'version-control',
    label: 'Version Control System',
    icon: ICONS.LAYERS,
    children: [gitServersPageDescription],
  },
  {
    id: 'management-tool',
    label: 'Management Tool',
    icon: ICONS.TOOLS,
    children: [jiraPageDescription],
  },
  {
    id: 'genAi',
    label: 'Gen AI',
    icon: 'ph:open-ai-logo',
    children: [chatAssistantPageDescription, codemiePageDescription],
  },
];
