import React from 'react';
import { useParams } from 'react-router-dom';
import { useStreamCDPipelineStage } from '../../../../k8s/EDPCDPipelineStage/hooks/useStreamCDPipelineStage';
import { EDPStageDetailsRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { stageName, namespace } = useParams<EDPStageDetailsRouteParams>();

  const stage = useStreamCDPipelineStage({
    namespace,
    stageMetadataName: stageName,
  });

  const DataContextValue = React.useMemo(
    () => ({
      stage,
    }),
    [stage]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
