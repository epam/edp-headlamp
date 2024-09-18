import { StageKubeObject } from '../../k8s/groups/EDP/Stage';
import { StageKubeObjectConfig } from '../../k8s/groups/EDP/Stage/config';

export const widgetPermissionsToCheck = {
  create: [],
  update: [{ instance: StageKubeObject, config: StageKubeObjectConfig }],
  delete: [{ instance: StageKubeObject, config: StageKubeObjectConfig }],
};
