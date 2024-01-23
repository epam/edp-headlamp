export const INTEGRATION_SECRET_NAMES = {
  JIRA: 'ci-jira',
  DEFECT_DOJO: 'ci-defectdojo',
  DEPENDENCY_TRACK: 'ci-dependency-track',
  NEXUS: 'ci-nexus',
  SONAR: 'ci-sonarqube',
  SSO: 'keycloak',
  ARGO_CD: 'ci-argocd',
} as const;

export const REGISTRY_SECRET_NAMES = {
  KANIKO_DOCKER_CONFIG: 'kaniko-docker-config',
  REGCRED: 'regcred',
} as const;
