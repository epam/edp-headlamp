export const SYSTEM_QUICK_LINKS = {
  // must be equal to QuickLink.metadata.name

  ARGOCD: 'argocd',
  DEFECT_DOJO: 'defectdojo',
  DEPENDENCY_TRACK: 'dependency-track',
  MONITORING: 'monitoring',
  LOGGING: 'logging',
  NEXUS: 'nexus',
  SONAR: 'sonar',
  CODEMIE: 'codemie',
} as const;

export const SYSTEM_QUICK_LINKS_LABELS = {
  [SYSTEM_QUICK_LINKS.ARGOCD]: 'Argo CD',
  [SYSTEM_QUICK_LINKS.MONITORING]: 'Monitoring',
  [SYSTEM_QUICK_LINKS.LOGGING]: 'Logging',
  [SYSTEM_QUICK_LINKS.SONAR]: 'Sonar',
} as const;

export const MONITORING_PROVIDERS = {
  GRAFANA: 'grafana',
  DATADOG: 'datadog',
} as const;
