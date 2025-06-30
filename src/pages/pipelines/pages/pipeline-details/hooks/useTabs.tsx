import { Box } from '@mui/material';
import React from 'react';
import { ViewYAML } from '../../../../../components/Editor';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { PipelineKubeObjectInterface } from '../../../../../k8s/groups/Tekton/Pipeline/types';
import { PipelineGraph } from '../../../../../widgets/PipelineGraph';
import { History } from '../components/History';
import { Overview } from '../components/Overview';

export const useTabs = ({
  pipeline,
}: {
  pipeline: PipelineKubeObjectInterface | null | undefined;
}) => {
  return React.useMemo(() => {
    return [
      {
        label: 'Overview',
        component: (
          <LoadingWrapper isLoading={pipeline === null}>
            <Box
              sx={{
                pt: (t) => t.typography.pxToRem(24),
              }}
            >
              <Overview pipeline={pipeline!} />
            </Box>
          </LoadingWrapper>
        ),
      },
      {
        label: 'View YAML',
        component: (
          <LoadingWrapper isLoading={pipeline === null}>
            <Box
              sx={{
                pt: (t) => t.typography.pxToRem(24),
              }}
            >
              <ViewYAML item={pipeline?.jsonData} />
            </Box>
          </LoadingWrapper>
        ),
      },
      {
        label: 'History',
        component: (
          <LoadingWrapper isLoading={pipeline === null}>
            <Box
              sx={{
                pt: (t) => t.typography.pxToRem(24),
              }}
            >
              <History />
            </Box>
          </LoadingWrapper>
        ),
      },
      {
        label: 'Diagram',
        component: (
          <LoadingWrapper isLoading={pipeline === null}>
            <Box
              sx={{
                pt: (t) => t.typography.pxToRem(24),
              }}
            >
              <PipelineGraph pipeline={pipeline!} />
            </Box>
          </LoadingWrapper>
        ),
      },
    ];
  }, [pipeline]);
};
