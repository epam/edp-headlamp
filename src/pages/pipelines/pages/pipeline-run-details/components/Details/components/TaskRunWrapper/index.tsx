import React from 'react';
import { TabsContextProvider } from '../../../../../../../../providers/Tabs/provider';
import { CustomTaskRun } from './components/CustomTaskRun';
import { TaskRun } from './components/TaskRun';
import { TaskRunWrapperProps } from './types';

export const TaskRunWrapper = ({ pipelineRunTaskData }: TaskRunWrapperProps) => {
  const isApprovalTask = !!pipelineRunTaskData?.approvalTask;

  return (
    <TabsContextProvider id="pipeline-details-page-inner-taskrun" initialTabIdx={0}>
      {isApprovalTask && pipelineRunTaskData ? (
        <CustomTaskRun pipelineRunTaskData={pipelineRunTaskData} />
      ) : (
        <TaskRun pipelineRunTaskData={pipelineRunTaskData!} />
      )}
    </TabsContextProvider>
  );
};
