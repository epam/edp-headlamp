import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { MenuAccordion } from './components/MenuAccordion';
import { TaskRunStepWrapper } from './components/TaskRunStepWrapper';
import { TaskRunWrapper } from './components/TaskRunWrapper';

export const Details = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const history = useHistory();

  const {
    pipelineRunData: {
      data: { pipelineRunTasks, pipelineRunTasksByNameMap },
    },
  } = useDynamicDataContext();

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
    const activePipelineRunTaskData = pipelineRunTasksByNameMap?.get(
      queryParamTaskRun || initialTaskRunName
    );

    if (!queryParamTaskRun || (queryParamTaskRun && !queryParamStep)) {
      return <TaskRunWrapper pipelineRunTaskData={activePipelineRunTaskData} />;
    } else if (queryParamTaskRun && queryParamStep) {
      return (
        <TaskRunStepWrapper
          pipelineRunTaskData={activePipelineRunTaskData}
          stepName={queryParamStep}
        />
      );
    }

    return null;
  }, [initialTaskRunName, pipelineRunTasksByNameMap, queryParamStep, queryParamTaskRun]);

  React.useEffect(() => {
    if (!queryParamTaskRun) {
      setQueryParams(initialTaskRunName);
    }
  }, [initialTaskRunName, queryParamTaskRun, setQueryParams]);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={2}>
        <Stack>
          {pipelineRunTasksByNameMap &&
            pipelineRunTasks.allTasks?.map(({ name: taskRunName }) => (
              <MenuAccordion
                key={taskRunName}
                pipelineRunTasksByNameMap={pipelineRunTasksByNameMap}
                taskRunName={taskRunName}
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
