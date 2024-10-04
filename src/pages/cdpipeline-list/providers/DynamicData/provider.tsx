import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { CDPipelineKubeObject } from '../../../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [CDPipelines, setCDPipelines] = React.useState<CDPipelineKubeObjectInterface[] | null>(
    null
  );
  const [CDPipelinesErrors, setCDPipelinesErrors] = React.useState<ApiError[] | null>(null);

  CDPipelineKubeObject.useApiList(
    (data) => setCDPipelines(data),
    (error) => {
      setCDPipelinesErrors((prev) => (prev ? [...prev, error] : [error]));
    }
  );

  const DataContextValue = React.useMemo(
    () => ({
      CDPipelines: {
        data: CDPipelines,
        errors: CDPipelinesErrors,
        isLoading: CDPipelines === null,
      },
    }),
    [CDPipelines, CDPipelinesErrors]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
