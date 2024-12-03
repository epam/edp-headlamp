import { Box } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { AllLogs } from '../components/AllLogs';
import { LogsByTask } from '../components/LogsByTask';

export const useTabs = () => {
  const { logs } = useDynamicDataContext();

  return React.useMemo(() => {
    return [
      {
        label: 'All Logs',
        component: (
          <Box
            sx={{
              pt: (t) => t.typography.pxToRem(24),
            }}
          >
            <LoadingWrapper isLoading={logs.isLoading}>
              <AllLogs logs={logs.data} />
            </LoadingWrapper>
          </Box>
        ),
      },
      {
        label: 'Logs By Task',
        component: (
          <Box
            sx={{
              pt: (t) => t.typography.pxToRem(24),
            }}
          >
            <LoadingWrapper isLoading={logs.isLoading}>
              <LogsByTask logs={logs.data} />
            </LoadingWrapper>
          </Box>
        ),
      },
    ];
  }, [logs.data, logs.isLoading]);
};
