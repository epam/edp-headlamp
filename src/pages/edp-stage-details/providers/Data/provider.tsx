import React from 'react';
import { useParams } from 'react-router-dom';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { useCDPipelineByNameQuery } from '../../../../k8s/EDPCDPipeline/hooks/useCDPipelineByNameQuery';
import { useCDPipelineStageListByCDPipelineNameQuery } from '../../../../k8s/EDPCDPipelineStage/hooks/useCDPipelineStageListByCDPipelineNameQuery';
import { useCodebasesByTypeLabelQuery } from '../../../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { useEnrichedApplicationsWithImageStreamsQuery } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE } from '../../../../k8s/EDPCodebase/labels';
import { useQuickLinksQuery } from '../../../../k8s/QuickLink/hooks/useQuickLinksQuery';
import { useQuickLinksURLsQuery } from '../../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
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

  const codebasesQuery = useCodebasesByTypeLabelQuery({
    props: {
      namespace,
      codebaseType: CODEBASE_TYPES.SYSTEM,
    },
  });

  const gitOpsCodebase =
    codebasesQuery.data?.items.find(
      (el) => el.metadata.labels[CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE] === 'gitops'
    ) ?? null;

  const QuickLinksQuery = useQuickLinksQuery({
    props: {
      namespace: namespace,
    },
  });

  const QuickLinksURLsQuery = useQuickLinksURLsQuery(namespace);

  const DataContextValue = React.useMemo(
    () => ({
      CDPipeline: {
        data: CDPipelineQuery.data,
        isLoading: CDPipelineQuery.isLoading,
        error: CDPipelineQuery.error,
      },
      stages: {
        data: stagesQuery.data?.items,
        isLoading: stagesQuery.isLoading,
        error: stagesQuery.error,
      },
      enrichedApplications: {
        data: enrichedApplications,
        isLoading: isEnrichedApplicationsWithImageStreamsQueryLoading,
        error: null,
      },
      gitOpsCodebase: {
        data: gitOpsCodebase,
        isLoading: codebasesQuery.isLoading,
        error: null,
      },
      QuickLinks: {
        data: QuickLinksQuery.data?.items,
        isLoading: QuickLinksQuery.isLoading,
        error: QuickLinksQuery.error,
      },
      QuickLinksURLs: {
        data: QuickLinksURLsQuery.data,
        isLoading: QuickLinksURLsQuery.isLoading,
        error: QuickLinksURLsQuery.error,
      },
    }),
    [
      CDPipelineQuery.data,
      CDPipelineQuery.error,
      CDPipelineQuery.isLoading,
      QuickLinksQuery.data?.items,
      QuickLinksQuery.error,
      QuickLinksQuery.isLoading,
      QuickLinksURLsQuery.data,
      QuickLinksURLsQuery.error,
      QuickLinksURLsQuery.isLoading,
      codebasesQuery.isLoading,
      enrichedApplications,
      gitOpsCodebase,
      isEnrichedApplicationsWithImageStreamsQueryLoading,
      stagesQuery.data,
      stagesQuery.error,
      stagesQuery.isLoading,
    ]
  );

  return <DataContext.Provider value={DataContextValue}>{children}</DataContext.Provider>;
};
