import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { Tabs } from '../../../../../../../../components/Tabs';
import { CRUD_TYPES } from '../../../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../../../hooks/useResourceCRUDMutation';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { ApprovalTaskKubeObject } from '../../../../../../../../k8s/groups/EDP/ApprovalTask';
import { APPROVAL_TASK_STATUS } from '../../../../../../../../k8s/groups/EDP/ApprovalTask/constants';
import { ApprovalTaskKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/ApprovalTask/types';
import { CustomRunKubeObject } from '../../../../../../../../k8s/groups/Tekton/CustomRun';
import { TaskRunKubeObject } from '../../../../../../../../k8s/groups/Tekton/TaskRun';
import { TASK_RUN_LABEL_SELECTOR_PIPELINE_TASK } from '../../../../../../../../k8s/groups/Tekton/TaskRun/labels';
import { useDialogContext } from '../../../../../../../../providers/Dialog/hooks';
import { humanize } from '../../../../../../../../utils/date/humanize';
import { StyledDetailsBody, StyledDetailsHeader } from '../../../../styles';
import { ChoiceButtonGroup } from './components/ChoiceButtonGroup';
import { CommentDialog } from './components/CommentDialog';
import { useTabs } from './hooks/useTabs';
import { CustomTaskRunProps } from './types';

const updateApprovalTask = ({
  approvalTask,
  action,
  approvedBy,
  comment,
}: {
  approvalTask: ApprovalTaskKubeObjectInterface;
  action: string;
  approvedBy?: string;
  comment?: string;
}) => {
  const updatedApprovalTask = {
    ...approvalTask,
    spec: {
      ...approvalTask.spec,
      action,
      approve: {
        approvedBy,
        comment,
      },
    },
  };

  return updatedApprovalTask;
};

function getTokens() {
  return JSON.parse(localStorage.tokens || '{}');
}

function getToken(cluster: string) {
  return getTokens()[cluster];
}

function getUserInfo(cluster: string) {
  const user = getToken(cluster)?.split('.')[1];
  return user ? JSON.parse(atob(user)) : null;
}

export const CustomTaskRun = ({ pipelineRunTaskData }: CustomTaskRunProps) => {
  const cluster = Utils.getCluster();
  const userInfo = !!cluster && getUserInfo(cluster);
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

  const handleClickApproveOrReject = React.useCallback(
    (action: string, comment?: string) => {
      const updatedApprovalTask = updateApprovalTask({
        approvalTask,
        approvedBy: userInfo?.email || 'dev',
        comment,
        action,
      });

      approvalTaskEditMutation.mutate(updatedApprovalTask);
    },
    [approvalTask, approvalTaskEditMutation, userInfo?.email]
  );

  const { setDialog } = useDialogContext();

  const approveOptions = React.useMemo(
    () => [
      {
        id: 'approve',
        icon: ICONS.ARROW_CHECK,
        label: 'Approve',
        onClick: () => handleClickApproveOrReject(APPROVAL_TASK_STATUS.APPROVED),
      },
      {
        id: 'approveWithComment',
        icon: ICONS.COMMENT,
        label: 'Approve with comment',
        onClick: () => {
          setDialog(CommentDialog, {
            title: 'Approve with comment',
            onFormSubmit: (comment: string) => {
              handleClickApproveOrReject(APPROVAL_TASK_STATUS.APPROVED, comment);
            },
          });
        },
      },
    ],
    [handleClickApproveOrReject, setDialog]
  );

  const rejectOptions = React.useMemo(
    () => [
      {
        id: 'reject',
        icon: ICONS.CROSS,
        label: 'Reject',
        onClick: () => handleClickApproveOrReject(APPROVAL_TASK_STATUS.REJECTED),
      },
      {
        id: 'rejectWithComment',
        icon: ICONS.COMMENT,
        label: 'Reject with comment',
        onClick: () => {
          setDialog(CommentDialog, {
            title: 'Reject with comment',
            onFormSubmit: (comment: string) => {
              handleClickApproveOrReject(APPROVAL_TASK_STATUS.REJECTED, comment);
            },
          });
        },
      },
    ],
    [handleClickApproveOrReject, setDialog]
  );

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
              <ChoiceButtonGroup options={approveOptions} type="accept" />
              <ChoiceButtonGroup options={rejectOptions} type="reject" />
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
