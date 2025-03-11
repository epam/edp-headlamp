import React from 'react';
import { useTableSettings } from '../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { TABLE } from '../../../../constants/tables';
import { FilterContextProvider } from '../../../../providers/Filter/provider';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PipelineRunList } from '../../../../widgets/PipelineRunList';
import { matchFunctions } from '../../../../widgets/PipelineRunList/constants';
import { PipelinesPageWrapper } from '../../components';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const permissions = useTypedPermissions();

  const { pipelineRuns } = useDynamicDataContext();

  const { loadSettings } = useTableSettings(TABLE.GENERAL_PIPELINE_RUN_LIST.id);

  const tableSettings = React.useMemo(() => loadSettings(), [loadSettings]);

  return (
    <PipelinesPageWrapper>
      <FilterContextProvider
        entityID={`PIPELINE_RUN_LIST_OVERVIEW::${getDefaultNamespace()}`}
        matchFunctions={matchFunctions}
        saveToLocalStorage
      >
        <PipelineRunList
          tableId={TABLE.GENERAL_PIPELINE_RUN_LIST.id}
          tableName={TABLE.GENERAL_PIPELINE_RUN_LIST.name}
          tableSettings={tableSettings}
          pipelineRuns={pipelineRuns.data}
          isLoading={
            pipelineRuns.isLoading && (!pipelineRuns.errors || !pipelineRuns.errors.length)
          }
          errors={pipelineRuns.errors}
          permissions={permissions}
        />
      </FilterContextProvider>
    </PipelinesPageWrapper>
  );
};
