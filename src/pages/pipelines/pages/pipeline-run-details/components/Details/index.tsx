import { Icon } from '@iconify/react';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EmptyList } from '../../../../../../components/EmptyList';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { ReserveLogs } from '../ReserveLogs';
import { MenuAccordion } from './components/MenuAccordion';
import { TaskRunStepWrapper } from './components/TaskRunStepWrapper';
import { TaskRunWrapper } from './components/TaskRunWrapper';

export const Details = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();

  const { pipelineRun, pipelineRunData, logs } = useDynamicDataContext();

  const { pipelineRunTasks, pipelineRunTasksByNameMap } = pipelineRunData.data!;

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

      history.replace({ search: queryParams.toString() });
    },
    [history]
  );

  const queryParamTaskRun = queryParams.get('taskRun');
  const queryParamStep = queryParams.get('step');

  const initialTaskRunName = pipelineRunTasks.allTasks?.[0]?.name;
  const hasReserveLogs = !logs.isLoading && !logs.error && !!logs?.data?.all?.length;

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

  if (!pipelineRunTasks.allTasks.length) {
    return <EmptyList customText="Could not get required PipelineRun data (Tasks/TaskRuns)." />;
  }

  if (hasReserveLogs && pipelineRun.error) {
    return (
      <Stack spacing={1}>
        <LoadingWrapper isLoading={logs.isLoading}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Icon icon={'ph:warning-fill'} color="#A2A7B7" width={48} height={48} />
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography
                component="span"
                fontSize={(t) => t.typography.pxToRem(14)}
                color="#596D80"
              >
                {hasReserveLogs ? (
                  'No pipeline runs were found for the requested resource. Logs have been retrieved from OpenSearch.'
                ) : (
                  <>
                    <p>
                      No logs were found for the requested pipeline run. This might have been caused
                      by environment cleanup. Please ensure you have checked the correct resource.
                    </p>
                    {logs.error && logs.error?.message}
                  </>
                )}
              </Typography>
            </Stack>
          </Stack>
          {hasReserveLogs && <ReserveLogs />}
        </LoadingWrapper>
      </Stack>
    );
  }

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
