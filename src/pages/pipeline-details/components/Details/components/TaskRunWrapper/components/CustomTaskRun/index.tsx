import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { Tabs } from '../../../../../../../../components/Tabs';
import { CRUD_TYPES } from '../../../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../../../hooks/useResourceCRUDMutation';
import { ApprovalTaskKubeObject } from '../../../../../../../../k8s/groups/EDP/ApprovalTask';
import { APPROVAL_TASK_STATUS } from '../../../../../../../../k8s/groups/EDP/ApprovalTask/constants';
import { CustomRunKubeObject } from '../../../../../../../../k8s/groups/Tekton/CustomRun';
import { TaskRunKubeObject } from '../../../../../../../../k8s/groups/Tekton/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK } from '../../../../../../../../k8s/groups/Tekton/TaskRun/labels';
import { humanize } from '../../../../../../../../utils/date/humanize';
import { StyledDetailsBody, StyledDetailsHeader } from '../../../../styles';
import { useTabs } from './hooks/useTabs';
import { CustomTaskRunProps } from './types';

export const CustomTaskRun = ({ pipelineRunTaskData }: CustomTaskRunProps) => {
  const { approvalTask } = pipelineRunTaskData;

  const isPending = approvalTask?.spec?.action === 'Pending';

  const taskRunMetadataName = approvalTask?.metadata?.ownerReferences?.[0]?.name;

  const [customTaskRun] = CustomRunKubeObject.useGet(
    taskRunMetadataName,
    approvalTask?.metadata?.namespace
  );
  const taskRunName = customTaskRun?.metadata?.labels?.[TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK];

  const taskRunReason = TaskRunKubeObject.parseStatusReason(customTaskRun);

  const completionTime = customTaskRun?.status?.completionTime;
  const startTime = customTaskRun?.status?.startTime;

  const endTime = completionTime || new Date().toISOString();

  const duration = humanize(new Date(endTime).getTime() - new Date(startTime).getTime(), {
    language: 'en-mini',
    spacer: '',
    delimiter: ' ',
    fallbacks: ['en'],
    largest: 2,
    round: true,
    units: ['d', 'h', 'm', 's'],
  });

  const tabs = useTabs({ taskRun: customTaskRun });

  const approvalTaskEditMutation = useResourceCRUDMutation<KubeObjectInterface, CRUD_TYPES.EDIT>(
    'approvalTaskEditMutation',
    ApprovalTaskKubeObject,
    CRUD_TYPES.EDIT
  );

  const handleClickApprove = () => {
    const updatedApprovalTask = {
      ...approvalTask,
      spec: {
        ...approvalTask.spec,
        action: APPROVAL_TASK_STATUS.APPROVED,
      },
    };

    approvalTaskEditMutation.mutate(updatedApprovalTask);
  };

  const handleClickReject = () => {
    const updatedApprovalTask = {
      ...approvalTask,
      spec: {
        ...approvalTask.spec,
        action: APPROVAL_TASK_STATUS.REJECTED,
      },
    };

    approvalTaskEditMutation.mutate(updatedApprovalTask);
  };

  return (
    <Paper>
      <StyledDetailsHeader>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontSize={(t) => t.typography.pxToRem(20)} fontWeight={500}>
                {taskRunName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography
                fontSize={(t) => t.typography.pxToRem(14)}
                fontWeight={500}
                color="primary.dark"
              >
                Status:{' '}
                <Typography
                  fontSize={(t) => t.typography.pxToRem(14)}
                  component="span"
                  color="secondary.dark"
                >
                  {taskRunReason}
                </Typography>
              </Typography>
              <Typography
                fontSize={(t) => t.typography.pxToRem(14)}
                fontWeight={500}
                color="primary.dark"
              >
                Duration:{' '}
                <Typography
                  fontSize={(t) => t.typography.pxToRem(14)}
                  component="span"
                  color="secondary.dark"
                >
                  {duration}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
          {isPending && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained" onClick={handleClickApprove}>
                approve
              </Button>
              <Button onClick={handleClickReject}>reject</Button>
            </Stack>
          )}
        </Stack>
      </StyledDetailsHeader>
      <Divider orientation="horizontal" />
      <StyledDetailsBody>
        <Tabs tabs={tabs} initialTabIdx={0} />
      </StyledDetailsBody>
    </Paper>
  );
};
