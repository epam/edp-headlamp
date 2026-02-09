export const TASK_RUN_REASON = {
  STARTED: 'started',
  PENDING: 'pending',
  RUNNING: 'running',
  TASK_RUN_CANCELLED: 'TaskRunCancelled',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  TASK_RUN_TIMEOUT: 'taskruntimeout',
  TASK_RUN_IMAGE_PULL_FAILED: 'taskrunimagepullfailed',
} as const;

export const TASK_RUN_STATUS = {
  TRUE: 'true',
  FALSE: 'false',
  UNKNOWN: 'unknown',
} as const;

export const TASK_RUN_STEP_STATUS = {
  RUNNING: 'running',
  TERMINATED: 'terminated',
  WAITING: 'waiting',
} as const;

export const TASK_RUN_STEP_REASON = {
  COMPLETED: 'completed',
} as const;
