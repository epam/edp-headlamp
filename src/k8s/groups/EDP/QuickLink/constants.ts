export const SYSTEM_QUICK_LINKS = {
  // must be equal to QuickLink.metadata.name

  ARGOCD: 'argocd',
  DEFECT_DOJO: 'defectdojo',
  DEPENDENCY_TRACK: 'dependency-track',
  GRAFANA: 'grafana',
  KIBANA: 'kibana',
  NEXUS: 'nexus',
  SONAR: 'sonar',
  CODEMIE: 'codemie',
} as const;

export const SYSTEM_QUICK_LINKS_LABELS = {
  [SYSTEM_QUICK_LINKS.ARGOCD]: 'Argo CD',
  [SYSTEM_QUICK_LINKS.GRAFANA]: 'Grafana',
  [SYSTEM_QUICK_LINKS.KIBANA]: 'Kibana',
} as const;
