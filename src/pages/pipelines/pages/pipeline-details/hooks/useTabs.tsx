import { Box } from '@mui/material';
import React from 'react';
import { ViewYAML } from '../../../../../components/Editor';
import { PipelineGraph } from '../../../../../widgets/PipelineGraph';
import { Overview } from '../components/Overview';

export const useTabs = ({ pipeline }) => {
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
            <Overview pipeline={pipeline} />
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
            <ViewYAML item={pipeline?.jsonData} />
          </Box>
        ),
      },
      {
        label: 'Diagram',
        component: (
          <Box
            sx={{
              pt: (t) => t.typography.pxToRem(24),
            }}
          >
            <PipelineGraph pipeline={pipeline} />
          </Box>
        ),
      },
    ];
  }, [pipeline]);
};
