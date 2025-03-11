import { Accordion, Divider, Grid, Paper, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { LogViewer } from '../../../../../../../../components/LogViewer';
import { StyledAccordionSummary } from '../../../../styles';
import { PipelineRouteParams } from '../../../../types';
import { StyledDetailsBody, StyledDetailsHeader } from '../../../Details/styles';
import { LogsByTaskProps } from './types';

export const LogsByTask = ({ logs }: LogsByTaskProps) => {
  const { name } = useParams<PipelineRouteParams>();

  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);

  const setQueryParams = React.useCallback(
    (taskRun: string) => {
      const queryParams = new URLSearchParams();
      if (taskRun) {
        queryParams.set('taskRun', taskRun);
      }

      history.push({ search: queryParams.toString() });
    },
    [history]
  );

  const queryParamTaskRun = queryParams.get('taskRun');

  const initialTaskRunName = logs.order[0];

  const handleAccordionChange = (taskRun: string) => () => {
    setQueryParams(taskRun);
  };

  React.useEffect(() => {
    if (!queryParamTaskRun) {
      setQueryParams(initialTaskRunName);
    }
  }, [initialTaskRunName, queryParamTaskRun, setQueryParams]);

  const theme = useTheme();

  const renderDetails = React.useCallback(() => {
    if (!queryParamTaskRun) {
      return null;
    }

    return (
      <Paper>
        <StyledDetailsHeader>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontSize={(t) => t.typography.pxToRem(20)} fontWeight={500}>
                {queryParamTaskRun}
              </Typography>
            </Stack>
          </Stack>
        </StyledDetailsHeader>
        <Divider orientation="horizontal" />
        <StyledDetailsBody>
          <LogViewer
            logs={logs?.map?.[queryParamTaskRun] || []}
            downloadName={`fallback-logs-${name}-${queryParamTaskRun}.log`}
          />
        </StyledDetailsBody>
      </Paper>
    );
  }, [logs?.map, name, queryParamTaskRun]);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={2}>
        <Stack>
          {logs &&
            logs.order?.map((taskRunName) => {
              const isExpanded = queryParamTaskRun === taskRunName;
              const isActive = queryParamTaskRun === taskRunName;

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
                    isActive={isActive}
                    disableRipple={false}
                    disableTouchRipple={false}
                  >
                    <Typography>{taskRunName}</Typography>
                  </StyledAccordionSummary>
                </Accordion>
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
