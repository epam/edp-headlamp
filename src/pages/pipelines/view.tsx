import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { FilterContextProvider } from '../../providers/Filter/provider';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { PipelineRunList } from '../../widgets/PipelineRunList';
import { matchFunctions } from '../../widgets/PipelineRunList/constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const theme = useTheme();

  const permissions = useTypedPermissions();

  const { pipelineRuns } = useDynamicDataContext();

  return (
    <PageWrapper>
      <Section
        title={
          <Typography color="primary.dark" fontSize={theme.typography.pxToRem(28)}>
            Pipelines
          </Typography>
        }
        description={'Monitor the progress of overall pipeline runs launched within the platform.'}
      >
        <FilterContextProvider
          entityID={`PIPELINE_RUN_LIST_OVERVIEW::${getDefaultNamespace()}`}
          matchFunctions={matchFunctions}
          saveToLocalStorage
        >
          <PipelineRunList
            pipelineRuns={pipelineRuns.data}
            isLoading={pipelineRuns.isLoading}
            errors={pipelineRuns.errors}
            permissions={permissions}
          />
        </FilterContextProvider>
      </Section>
    </PageWrapper>
  );
};
