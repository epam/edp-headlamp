import React from 'react';
import { useParams } from 'react-router-dom';
import { useStreamCDPipeline } from '../../../../k8s/EDPCDPipeline/hooks/useStreamCDPipeline';
import { useStreamStagesByCDPipelineName } from '../../../../k8s/EDPCDPipelineStage/hooks/useStreamStagesByCDPipelineName';
import { useEnrichedApplicationsWithImageStreamsQuery } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCDPipelineRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<EDPCDPipelineRouteParams>();

  const CDPipeline = useStreamCDPipeline({
    namespace,
    CDPipelineMetadataName: name,
  });

  const {
    isLoading: isEnrichedApplicationsWithImageStreamsQueryLoading,
    data: enrichedApplications,
  } = useEnrichedApplicationsWithImageStreamsQuery({
    props: {
      CDPipelineData: CDPipeline,
    },
  });

  const enrichedApplicationsValue = React.useMemo(
    () => !isEnrichedApplicationsWithImageStreamsQueryLoading && enrichedApplications,
    [enrichedApplications, isEnrichedApplicationsWithImageStreamsQueryLoading]
  );

  const stages = useStreamStagesByCDPipelineName({
    namespace,
    CDPipelineMetadataName: name,
    select: React.useCallback((data) => {
      return data.sort((a, b) => a.spec.order - b.spec.order);
    }, []),
  });

  const DataContextValue = React.useMemo(
    () => ({
      CDPipeline,
      stages,
      enrichedApplications: enrichedApplicationsValue,
    }),
    [CDPipeline, stages, enrichedApplicationsValue]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
