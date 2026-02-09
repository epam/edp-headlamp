import { Box } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../components/LoadingWrapper';
import { ResourceActionListContextProvider } from '../../../providers/ResourceActionList/provider';
import { CodebaseBranchesList } from '../components/CodebaseBranchesList';
import { Overview } from '../components/Overview';
import { useDynamicDataContext } from '../providers/DynamicData/hooks';

export const usePageTabs = () => {
  const { codebaseBranches } = useDynamicDataContext();

  return React.useMemo(() => {
    return [
      {
        label: 'Overview',
        id: 'overview',
        component: (
          <Box sx={{ mt: (t) => t.typography.pxToRem(24) }}>
            <Overview />
          </Box>
        ),
      },
      {
        label: 'Branches',
        id: 'branches',
        component: (
          <Box sx={{ mt: (t) => t.typography.pxToRem(24) }}>
            <LoadingWrapper isLoading={codebaseBranches.isLoading}>
              <ResourceActionListContextProvider>
                <CodebaseBranchesList />
              </ResourceActionListContextProvider>
            </LoadingWrapper>
          </Box>
        ),
      },
    ];
  }, [codebaseBranches.isLoading]);
};
