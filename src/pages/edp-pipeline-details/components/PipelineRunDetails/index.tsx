import { Icon } from '@iconify/react';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { TaskRunKubeObject } from '../../../../k8s/TaskRun';
import { TaskRunKubeObjectInterface } from '../../../../k8s/TaskRun/types';
import {
  getTaskRunStepReason,
  getTaskRunStepStatus,
} from '../../../../k8s/TaskRun/utils/getStatus';
import {
  StyledAccordion,
  StyledAccordionChildBtn,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from '../../styles';
import { TaskRun } from './components/TaskRun';
import { TaskRunStep } from './components/TaskRunStep';

export const PipelineRunDetails = ({ pipelineRunTasks, taskRunListByNameMap }) => {
  const initialTask = pipelineRunTasks.allTasks?.[0]?.name;

  const [activeTab, setActiveTab] = React.useState<{
    type: 'taskRun' | 'step';
    name: string;
  }>({
    type: 'taskRun',
    name: initialTask,
  });

  const [activeAccordion, setActiveAccordion] = React.useState<string | false>(initialTask);

  const handleAccordionChange =
    (taskRun: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setActiveTab({
        type: 'taskRun',
        name: taskRun,
      });

      if (!isExpanded) {
        return;
      }

      setActiveAccordion(taskRun);
    };

  const activeTaskRun = activeAccordion && taskRunListByNameMap?.get(activeAccordion);
  const activeStep = activeTaskRun?.status?.steps?.find(
    (step: TaskRunKubeObjectInterface) => step.name === activeTab.name
  );

  const renderDetails = React.useCallback(() => {
    if (!activeTab.name || !activeTaskRun) {
      return null;
    }

    if (activeTab.type === 'taskRun') {
      return <TaskRun taskRun={activeTaskRun} />;
    }

    return <TaskRunStep taskRun={activeTaskRun} step={activeStep} />;
  }, [activeStep, activeTab.name, activeTab.type, activeTaskRun]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={2}>
        <Stack>
          {taskRunListByNameMap &&
            pipelineRunTasks.allTasks.map(({ name: taskRunName }) => {
              const taskRun = taskRunListByNameMap.get(taskRunName)?.jsonData;
              const taskRunStatus = TaskRunKubeObject.parseStatus(taskRun);
              const taskRunReason = TaskRunKubeObject.parseStatusReason(taskRun);

              const [icon, color, isRotating] = TaskRunKubeObject.getStatusIcon(
                taskRunStatus,
                taskRunReason
              );

              const taskRunSteps = taskRun?.status?.steps;
              const isExpanded = activeAccordion === taskRunName;
              const isActive = activeTab.type === 'taskRun' && activeTab.name === taskRunName;

              return (
                <StyledAccordion
                  key={taskRunName}
                  expanded={isExpanded}
                  onChange={handleAccordionChange(taskRunName)}
                  sx={{ borderLeft: isExpanded ? `2px solid ${color}` : null }}
                >
                  <StyledAccordionSummary
                    expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
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
                        const taskRunStepName = step.name;

                        const status = getTaskRunStepStatus(step);
                        const reason = getTaskRunStepReason(step);
                        const [icon, color, isRotating] = TaskRunKubeObject.getStepStatusIcon(
                          status,
                          reason
                        );

                        const isActive =
                          activeTab.type === 'step' && activeTab.name === taskRunStepName;

                        return (
                          <StyledAccordionChildBtn
                            color="inherit"
                            onClick={() =>
                              setActiveTab({
                                type: 'step',
                                name: taskRunStepName,
                              })
                            }
                            isActive={isActive}
                          >
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <StatusIcon
                                icon={icon}
                                color={color}
                                isRotating={isRotating}
                                Title={`Status: ${status}. Reason: ${reason}`}
                                width={15}
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
                </StyledAccordion>
              );
            })}
        </Stack>
      </Grid>
      <Grid item xs={10}>
        {renderDetails()}
      </Grid>
    </Grid>
  );
};
