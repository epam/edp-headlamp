import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { useTableSettings } from '../../components/Table/components/TableSettings/hooks/useTableSettings';
import { TABLES } from '../../constants/tables';
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

  const { loadSettings } = useTableSettings(TABLES.GENERAL_PIPELINE_RUN_LIST.id);

  const tableSettings = React.useMemo(() => loadSettings(), [loadSettings]);

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
            tableId={TABLES.GENERAL_PIPELINE_RUN_LIST.id}
            tableName={TABLES.GENERAL_PIPELINE_RUN_LIST.name}
            tableSettings={tableSettings}
            pipelineRuns={pipelineRuns.data}
            isLoading={
              pipelineRuns.isLoading && (!pipelineRuns.errors || !pipelineRuns.errors.length)
            }
            errors={pipelineRuns.errors}
            permissions={permissions}
          />
        </FilterContextProvider>
      </Section>
    </PageWrapper>
  );
};
