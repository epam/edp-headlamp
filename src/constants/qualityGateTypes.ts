import { ValueOf } from '../types/global';

export const QUALITY_GATE_TYPE = {
  MANUAL: 'manual',
  AUTOTESTS: 'autotests',
} as const;

export type QualityGateType = ValueOf<typeof QUALITY_GATE_TYPE>;
