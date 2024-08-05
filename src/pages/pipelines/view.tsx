import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { FilterContextProvider } from '../../providers/Filter';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { PipelineRunList } from '../../widgets/PipelineRunList';
import { matchFunctions } from '../../widgets/PipelineRunList/constants';
import { usePermissionsContext } from './providers/Permissions/hooks';

export const PageView = () => {
  const theme = useTheme();

  const { pipelineRun: permissions } = usePermissionsContext();
  const [items, error] = PipelineRunKubeObject.useList();

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
            pipelineRuns={items}
            isLoading={items === null}
            error={error}
            permissions={permissions}
          />
        </FilterContextProvider>
      </Section>
    </PageWrapper>
  );
};
