import { ValueOf } from '../../../../../../types/global';
import { TASK_RUN_STEP_REASON, TASK_RUN_STEP_STATUS } from '../../constants';
import { TaskRunStep } from '../../types';

export const getTaskRunStepStatus = (step: TaskRunStep | undefined) => {
  return step?.[TASK_RUN_STEP_STATUS.RUNNING]
    ? TASK_RUN_STEP_STATUS.RUNNING
    : step?.[TASK_RUN_STEP_STATUS.WAITING]
    ? TASK_RUN_STEP_STATUS.WAITING
    : step?.[TASK_RUN_STEP_STATUS.TERMINATED]
    ? TASK_RUN_STEP_STATUS.TERMINATED
    : undefined;
};

export const getTaskRunStepStatusObject = (step: TaskRunStep | undefined) => {
  return (
    step?.[TASK_RUN_STEP_STATUS.RUNNING] ||
    step?.[TASK_RUN_STEP_STATUS.WAITING] ||
    step?.[TASK_RUN_STEP_STATUS.TERMINATED]
  );
};

export const getTaskRunStepReason = (
  step: TaskRunStep | undefined
): ValueOf<typeof TASK_RUN_STEP_REASON> | undefined => {
  const statusObject = getTaskRunStepStatusObject(step);

  return statusObject?.reason;
};
