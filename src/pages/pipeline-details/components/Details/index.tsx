import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { TaskRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/TaskRun/types';
import { MenuAccordion } from './components/MenuAccordion';
import { TaskRun } from './components/TaskRun';
import { TaskRunStep } from './components/TaskRunStep';

export const Details = ({ pipelineRunTasks, taskRunListByNameMap, taskListByTaskRunNameMap }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const history = useHistory();

  const setQueryParams = React.useCallback(
    (taskRun: string, step?: string) => {
      const queryParams = new URLSearchParams();
      if (taskRun) {
        queryParams.set('taskRun', taskRun);
      }
      if (step) {
        queryParams.set('step', step);
      } else {
        queryParams.delete('step');
      }

      history.push({ search: queryParams.toString() });
    },
    [history]
  );

  const queryParamTaskRun = queryParams.get('taskRun');
  const queryParamStep = queryParams.get('step');

  const initialTaskRunName = pipelineRunTasks.allTasks?.[0]?.name;

  const renderDetails = React.useCallback(() => {
    const activeTaskRun = taskRunListByNameMap?.get(queryParamTaskRun || initialTaskRunName);
    const activeTask = taskListByTaskRunNameMap?.get(queryParamTaskRun || initialTaskRunName);

    if (!queryParamTaskRun) {
      return <TaskRun taskRun={activeTaskRun} task={activeTask} taskRunName={queryParamTaskRun} />;
    }

    const activeStep = activeTask?.spec?.steps?.find(
      (step: TaskRunKubeObjectInterface) => step?.name === queryParamStep
    );

    if (queryParamTaskRun && !queryParamStep) {
      return <TaskRun taskRun={activeTaskRun} task={activeTask} taskRunName={queryParamTaskRun} />;
    } else if (queryParamTaskRun && queryParamStep) {
      return <TaskRunStep taskRun={activeTaskRun} task={activeTask} step={activeStep} />;
    }

    return null;
  }, [
    initialTaskRunName,
    queryParamStep,
    queryParamTaskRun,
    taskListByTaskRunNameMap,
    taskRunListByNameMap,
  ]);

  React.useEffect(() => {
    if (!queryParamTaskRun) {
      setQueryParams(initialTaskRunName);
    }
  }, [initialTaskRunName, queryParamTaskRun, setQueryParams]);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={2}>
        <Stack>
          {taskRunListByNameMap &&
            pipelineRunTasks.allTasks?.map(({ name: taskRunName }) => (
              <MenuAccordion
                key={taskRunName}
                taskRunName={taskRunName}
                taskRunListByNameMap={taskRunListByNameMap}
                taskListByTaskRunNameMap={taskListByTaskRunNameMap}
                setQueryParams={setQueryParams}
              />
            ))}
        </Stack>
      </Grid>
      <Grid item xs={10}>
        {renderDetails()}
      </Grid>
    </Grid>
  );
};
