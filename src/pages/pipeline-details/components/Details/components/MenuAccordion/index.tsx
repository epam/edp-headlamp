import { Icon } from '@iconify/react';
import { Accordion, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { StatusIcon } from '../../../../../../components/StatusIcon';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { ApprovalTaskKubeObject } from '../../../../../../k8s/groups/EDP/ApprovalTask';
import { APPROVAL_TASK_STATUS } from '../../../../../../k8s/groups/EDP/ApprovalTask/constants';
import { ApprovalTaskKubeObjectInterface } from '../../../../../../k8s/groups/EDP/ApprovalTask/types';
import { TaskRunKubeObject } from '../../../../../../k8s/groups/Tekton/TaskRun';
import { TaskRunKubeObjectInterface } from '../../../../../../k8s/groups/Tekton/TaskRun/types';
import {
  getTaskRunStepReason,
  getTaskRunStepStatus,
} from '../../../../../../k8s/groups/Tekton/TaskRun/utils/getStatus';
import {
  StyledAccordionChildBtn,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from '../../../../styles';

const approvalTaskBackground =
  'repeating-linear-gradient(45deg, rgba(96, 96, 96, 0.15), rgba(96, 96, 96, 0.15) 10px, rgba(70, 70, 70, 0.15) 10px, rgba(70, 70, 70, 0.15) 20px);';

export function updateUnexecutedSteps(steps) {
  if (!steps) {
    return steps;
  }
  let errorIndex = steps.length - 1;
  return steps.map((step, index) => {
    if (!step.terminated || step.terminated.reason !== 'Completed') {
      errorIndex = Math.min(index, errorIndex);
    }
    if (index > errorIndex) {
      // eslint-disable-next-line no-unused-vars
      const { running, terminated, ...rest } = step;
      return { ...rest };
    }
    return step;
  });
}

const getTaskStatusData = (
  approvalTask: ApprovalTaskKubeObjectInterface,
  taskRun: TaskRunKubeObjectInterface
) => {
  if (approvalTask) {
    return ApprovalTaskKubeObject.getStatusIcon(approvalTask?.spec?.action);
  }

  const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
  const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);

  return TaskRunKubeObject.getStatusIcon(taskRunStatus, taskRunReason);
};

const getStatusTitle = (
  approvalTask: ApprovalTaskKubeObjectInterface,
  taskRun: TaskRunKubeObjectInterface
) => {
  if (approvalTask) {
    return `Status: ${approvalTask?.spec?.action}`;
  }

  const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
  const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);
  return `Status: ${taskRunStatus}. Reason: ${taskRunReason}`;
};

export const MenuAccordion = ({ taskRunName, pipelineRunTasksByNameMap, setQueryParams }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const queryParamTaskRun = queryParams.get('taskRun');
  const queryParamStep = queryParams.get('step');

  const pipelineRunTaskData = pipelineRunTasksByNameMap.get(taskRunName);

  const approvalTask = pipelineRunTaskData.approvalTask;

  const taskRun = pipelineRunTaskData.taskRun;
  const task = pipelineRunTaskData.task?.jsonData;

  const [icon, color, isRotating] = getTaskStatusData(approvalTask, taskRun);
  const statusTitle = getStatusTitle(approvalTask, taskRun);

  const taskRunSteps = updateUnexecutedSteps(taskRun ? taskRun?.status?.steps : task?.spec.steps);
  const isExpanded = queryParamTaskRun === taskRunName;
  const isActive = queryParamTaskRun === taskRunName && !queryParamStep;

  const handleAccordionChange = (taskRun: string) => () => {
    setQueryParams(taskRun);
  };

  const theme = useTheme();

  return (
    <Accordion
      key={taskRunName}
      expanded={isExpanded}
      onChange={handleAccordionChange(taskRunName)}
      sx={{
        borderLeft: isExpanded ? `2px solid ${theme.palette.primary.main}` : null,
        maxWidth: isExpanded ? '100%' : '90%',

        '&.Mui-expanded': {
          margin: 0,

          '&::before': {
            opacity: 1,
          },
        },
      }}
    >
      <StyledAccordionSummary
        expandIcon={taskRunSteps?.length ? <Icon icon={ICONS.ARROW_DOWN} /> : null}
        isActive={isActive}
        disableRipple={false}
        disableTouchRipple={false}
        sx={{
          ...(pipelineRunTaskData.approvalTask &&
          pipelineRunTaskData.approvalTask?.spec.action === APPROVAL_TASK_STATUS.PENDING
            ? { background: approvalTaskBackground }
            : {}),
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <StatusIcon
            icon={icon}
            color={color}
            isRotating={isRotating}
            Title={statusTitle}
            width={20}
          />
          <Typography>{taskRunName}</Typography>
        </Stack>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Stack>
          {taskRunSteps?.map((step) => {
            const taskRunStepName = step?.name;

            const status = getTaskRunStepStatus(step);
            const reason = getTaskRunStepReason(step);
            const [icon, color, isRotating] = TaskRunKubeObject.getStepStatusIcon(status, reason);

            const isActive = queryParamStep && queryParamStep === taskRunStepName;

            return (
              <StyledAccordionChildBtn
                color="inherit"
                onClick={() => {
                  setQueryParams(taskRunName, taskRunStepName);
                }}
                isActive={isActive}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <StatusIcon
                    icon={icon}
                    color={color}
                    isRotating={isRotating}
                    Title={`Status: ${status}. Reason: ${reason}`}
                    width={20}
                  />
                  <Typography
                    fontSize={(t) => t.typography.pxToRem(14)}
                    fontWeight={isActive ? 500 : 400}
                    textAlign="left"
                  >
                    {taskRunStepName}
                  </Typography>
                </Stack>
              </StyledAccordionChildBtn>
            );
          })}
        </Stack>
      </StyledAccordionDetails>
    </Accordion>
  );
};
