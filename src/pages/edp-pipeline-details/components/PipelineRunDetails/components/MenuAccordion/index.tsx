import { Icon } from '@iconify/react';
import { Accordion, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { StatusIcon } from '../../../../../../components/StatusIcon';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { TaskRunKubeObject } from '../../../../../../k8s/TaskRun';
import {
  getTaskRunStepReason,
  getTaskRunStepStatus,
} from '../../../../../../k8s/TaskRun/utils/getStatus';
import {
  StyledAccordionChildBtn,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from '../../../../styles';

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

export const MenuAccordion = ({ taskRunName, taskRunListByNameMap, setQueryParams }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const queryParamTaskRun = queryParams.get('taskRun');
  const queryParamStep = queryParams.get('step');

  const taskRun = taskRunListByNameMap.get(taskRunName)?.jsonData;
  const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
  const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);

  const [icon, color, isRotating] = TaskRunKubeObject.getStatusIcon(taskRunStatus, taskRunReason);

  const taskRunSteps = updateUnexecutedSteps(taskRun?.status?.steps);
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
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <StatusIcon
            icon={icon}
            color={color}
            isRotating={isRotating}
            Title={`Status: ${taskRunStatus}. Reason: ${taskRunReason}`}
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
