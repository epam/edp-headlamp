import { ValueOf } from '../types/global';

export const DEPLOYMENT_SCRIPT = {
  HELM_CHART: 'helm-chart',
  RPM_PACKAGE: 'rpm-package',
} as const;

export type DeploymentScript = ValueOf<typeof DEPLOYMENT_SCRIPT>;
