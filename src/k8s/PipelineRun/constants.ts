import { SelectOption } from '../../types/forms';

export const PIPELINE_RUN_REASON = {
  STARTED: 'started',
  RUNNING: 'running',
  CANCELLED: 'cancelled',
  SUCCEEDED: 'succeeded',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PIPELINE_RUN_TIMEOUT: 'pipelineruntimeout',
  CREATE_RUN_FAILED: 'createrunfailed',
} as const;

export const PIPELINE_RUN_STATUS = {
  TRUE: 'true',
  FALSE: 'false',
  UNKNOWN: 'unknown',
} as const;

export const PIPELINE_RUN_STATUS_SELECT_OPTIONS: SelectOption[] = [
  {
    label: 'Success',
    value: PIPELINE_RUN_STATUS.TRUE,
  },
  {
    label: 'Failure',
    value: PIPELINE_RUN_STATUS.FALSE,
  },
  {
    label: 'Unknown',
    value: PIPELINE_RUN_STATUS.UNKNOWN,
  },
];
