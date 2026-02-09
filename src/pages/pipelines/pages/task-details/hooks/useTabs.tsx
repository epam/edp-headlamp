import { Box } from '@mui/material';
import React from 'react';
import { ViewYAML } from '../../../../../components/Editor';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { TaskKubeObjectInterface } from '../../../../../k8s/groups/Tekton/Task/types';
import { Overview } from '../components/Overview';

export const useTabs = ({ task }: { task: TaskKubeObjectInterface }) => {
  return React.useMemo(() => {
    return [
      {
        label: 'Overview',
        component: (
          <LoadingWrapper isLoading={task === null}>
            <Box
              sx={{
                pt: (t) => t.typography.pxToRem(24),
              }}
            >
              <Overview task={task} />
            </Box>
          </LoadingWrapper>
        ),
      },
      {
        label: 'View YAML',
        component: (
          <LoadingWrapper isLoading={task === null}>
            <Box
              sx={{
                pt: (t) => t.typography.pxToRem(24),
              }}
            >
              <ViewYAML item={task?.jsonData} />
            </Box>
          </LoadingWrapper>
        ),
      },
    ];
  }, [task]);
};
