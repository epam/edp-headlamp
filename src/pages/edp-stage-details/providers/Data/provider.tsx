import React from 'react';
import { useParams } from 'react-router-dom';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { useCDPipelineByNameQuery } from '../../../../k8s/EDPCDPipeline/hooks/useCDPipelineByNameQuery';
import { useCDPipelineStageListByCDPipelineNameQuery } from '../../../../k8s/EDPCDPipelineStage/hooks/useCDPipelineStageListByCDPipelineNameQuery';
import { useCodebasesByTypeLabelQuery } from '../../../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { useEnrichedApplicationsWithImageStreamsQuery } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE } from '../../../../k8s/EDPCodebase/labels';
import { EDPStageDetailsRouteParams } from '../../types';
import { DataContext } from './context';

export const DataContextProvider: React.FC = ({ children }) => {
  const { CDPipelineName, namespace } = useParams<EDPStageDetailsRouteParams>();

  const CDPipelineQuery = useCDPipelineByNameQuery({
    props: {
      name: CDPipelineName,
      namespace,
    },
    options: {
      enabled: !!CDPipelineName,
    },
  });

  const stagesQuery = useCDPipelineStageListByCDPipelineNameQuery({
    props: {
      namespace,
      CDPipelineMetadataName: CDPipelineName,
    },
  });

  const {
    isLoading: isEnrichedApplicationsWithImageStreamsQueryLoading,
    data: enrichedApplications,
  } = useEnrichedApplicationsWithImageStreamsQuery({
    props: {
      CDPipelineData: CDPipelineQuery?.data,
    },
    options: {
      enabled: CDPipelineQuery.isFetched,
    },
  });

  const { data: codebases } = useCodebasesByTypeLabelQuery({
    props: {
      namespace,
      codebaseType: CODEBASE_TYPES.SYSTEM,
    },
  });

  const gitOpsCodebase =
    codebases?.items.find(
      (el) => el.metadata.labels[CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE] === 'gitops'
    ) ?? null;

  const DataContextValue = React.useMemo(
    () => ({
      CDPipeline: CDPipelineQuery.data,
      stages: stagesQuery.data,
      enrichedApplications:
        !isEnrichedApplicationsWithImageStreamsQueryLoading && enrichedApplications,
      gitOpsCodebase,
    }),
    [
      CDPipelineQuery.data,
      enrichedApplications,
      gitOpsCodebase,
      isEnrichedApplicationsWithImageStreamsQueryLoading,
      stagesQuery.data,
    ]
  );

  return <DataContext.Provider value={DataContextValue}>{children}</DataContext.Provider>;
};
