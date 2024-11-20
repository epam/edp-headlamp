import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_QUALITY_GATE = {
  id: uuidv4(),
  qualityGateType: 'manual',
  stepName: 'approve',
  autotestName: null,
  branchName: null,
};
