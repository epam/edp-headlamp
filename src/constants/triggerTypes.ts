import { ValueOf } from '../types/global';

export const TRIGGER_TYPE = {
  MANUAL: 'Manual',
  AUTO: 'Auto',
  AUTO_STABLE: 'Auto-stable',
} as const;

export type TriggerType = ValueOf<typeof TRIGGER_TYPE>;
