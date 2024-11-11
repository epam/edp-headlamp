import { Box } from '@mui/material';
import React from 'react';
import { ViewYAML } from '../../../components/Editor';
import { useTabsContext } from '../../../providers/Tabs/hooks';
import { PipelineRunGraph } from '../../../widgets/PipelineRunGraph';
import { Details } from '../components/Details';
import { Overview } from '../components/Overview';
import { useDynamicDataContext } from '../providers/DynamicData/hooks';

export const useTabs = () => {
  const { pipelineRun } = useDynamicDataContext();

  const { handleChangeTab } = useTabsContext();

  const onNodeElementLinkClick = React.useCallback(() => {
    handleChangeTab(null, 1);
  }, [handleChangeTab]);

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
            <Overview />
          </Box>
        ),
      },
      {
        label: 'Details',
        component: (
          <Box
            sx={{
              pt: (t) => t.typography.pxToRem(24),
            }}
          >
            <Details />
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
            <ViewYAML item={pipelineRun.data} />
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
            <PipelineRunGraph
              pipelineRun={pipelineRun.data}
              onNodeElementLinkClick={onNodeElementLinkClick}
            />
          </Box>
        ),
      },
    ];
  }, [onNodeElementLinkClick, pipelineRun.data]);
};
