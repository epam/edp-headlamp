import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [pipelineRuns, setPipelineRuns] = React.useState<PipelineRunKubeObjectInterface[] | null>(
    null
  );
  const [pipelineRunsErrors, setPipelineRunsErrors] = React.useState<ApiError[] | null>(null);

  PipelineRunKubeObject.useApiList(
    (data) => setPipelineRuns(data),
    (error) => {
      setPipelineRunsErrors((prev) => (prev ? [...prev, error] : [error]));
    }
  );

  const DataContextValue = React.useMemo(
    () => ({
      pipelineRuns: {
        data: pipelineRuns,
        errors: pipelineRunsErrors,
        isLoading: pipelineRuns === null,
      },
    }),
    [pipelineRuns, pipelineRunsErrors]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
