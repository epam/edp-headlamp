export const SYSTEM_QUICK_LINKS = {
  // must be equal to QuickLink.metadata.name

  GERRIT: 'gerrit',
  GITLAB: 'gitlab',
  GITHUB: 'github',
  TEKTON: 'tekton',
  ARGOCD: 'argocd',
  DEFECT_DOJO: 'defectdojo',
  DEPENDENCY_TRACK: 'dependency-track',
  DOCKER_REGISTRY: 'docker-registry',
  GRAFANA: 'grafana',
  KIBANA: 'kibana',
  NEXUS: 'nexus',
  SONAR: 'sonar',
  CODEMIE: 'codemie',
} as const;

export const SYSTEM_QUICK_LINKS_WITH_CONFIGURATION = [
  SYSTEM_QUICK_LINKS.NEXUS,
  SYSTEM_QUICK_LINKS.ARGOCD,
  SYSTEM_QUICK_LINKS.SONAR,
  SYSTEM_QUICK_LINKS.DEFECT_DOJO,
  SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK,
] as const;

export const SYSTEM_QUICK_LINKS_LABELS = {
  [SYSTEM_QUICK_LINKS.GERRIT]: 'Gerrit',
  [SYSTEM_QUICK_LINKS.GITLAB]: 'GitLab',
  [SYSTEM_QUICK_LINKS.GITHUB]: 'GitHub',
  [SYSTEM_QUICK_LINKS.TEKTON]: 'Tekton',
  [SYSTEM_QUICK_LINKS.ARGOCD]: 'Argo CD',
  [SYSTEM_QUICK_LINKS.DEFECT_DOJO]: 'DefectDojo',
  [SYSTEM_QUICK_LINKS.DEPENDENCY_TRACK]: 'DependencyTrack',
  [SYSTEM_QUICK_LINKS.DOCKER_REGISTRY]: 'DockerRegistry',
  [SYSTEM_QUICK_LINKS.GRAFANA]: 'Grafana',
  [SYSTEM_QUICK_LINKS.KIBANA]: 'Kibana',
  [SYSTEM_QUICK_LINKS.NEXUS]: 'Nexus',
  [SYSTEM_QUICK_LINKS.SONAR]: 'Sonar',
} as const;
