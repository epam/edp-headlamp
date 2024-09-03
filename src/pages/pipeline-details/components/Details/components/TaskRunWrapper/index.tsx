import React from 'react';
import { CustomTaskRun } from './components/CustomTaskRun';
import { TaskRun } from './components/TaskRun';
import { TaskRunWrapperProps } from './types';

export const TaskRunWrapper = ({ pipelineRunTaskData }: TaskRunWrapperProps) => {
  const isApprovalTask = !!pipelineRunTaskData?.approvalTask;

  return isApprovalTask ? (
    <CustomTaskRun pipelineRunTaskData={pipelineRunTaskData} />
  ) : (
    <TaskRun pipelineRunTaskData={pipelineRunTaskData} />
  );
};
