import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { FilterContextProvider } from '../../providers/Filter/provider';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { PipelineRunList } from '../../widgets/PipelineRunList';
import { matchFunctions } from '../../widgets/PipelineRunList/constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const theme = useTheme();

  const permissions = useTypedPermissions();
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
            permissions={{
              create: permissions.create.PipelineRun,
              update: permissions.update.PipelineRun,
              delete: permissions.delete.PipelineRun,
            }}
          />
        </FilterContextProvider>
      </Section>
    </PageWrapper>
  );
};
