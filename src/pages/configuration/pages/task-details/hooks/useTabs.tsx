import { Box } from '@mui/material';
import React from 'react';
import { ViewYAML } from '../../../../../components/Editor';
import { Overview } from '../components/Overview';

export const useTabs = ({ task }) => {
  return React.useMemo(() => {
    return [
      {
        label: 'Overview',
        component: (
          <Box
            sx={{
              pt: (t) => t.typography.pxToRem(24),
            }}
          >
            <Overview task={task} />
          </Box>
        ),
      },
      {
        label: 'View YAML',
        component: (
          <Box
            sx={{
              pt: (t) => t.typography.pxToRem(24),
            }}
          >
            <ViewYAML item={task?.jsonData} />
          </Box>
        ),
      },
    ];
  }, [task]);
};
