import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCDPipelineByNameQuery } from '../../../../k8s/groups/EDP/CDPipeline/hooks/useCDPipelineByNameQuery';
import { useEnrichedApplicationsWithImageStreamsQuery } from '../../../../k8s/groups/EDP/Codebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { useGitOpsCodebaseQuery } from '../../../../k8s/groups/EDP/Codebase/hooks/useGitOpsCodebaseQuery';
import { useQuickLinksQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksQuery';
import { useQuickLinksURLsQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { useCDPipelineStageListByCDPipelineNameQuery } from '../../../../k8s/groups/EDP/Stage/hooks/useCDPipelineStageListByCDPipelineNameQuery';
import { EDPStageDetailsRouteParams } from '../../types';
import { DataContext } from './context';

export const DataContextProvider: React.FC = ({ children }) => {
  const { CDPipelineName, namespace } = useParams<EDPStageDetailsRouteParams>();

  const CDPipelineQuery = useCDPipelineByNameQuery(CDPipelineName, namespace);

  const stagesQuery = useCDPipelineStageListByCDPipelineNameQuery({
    props: {
      namespace,
      CDPipelineMetadataName: CDPipelineName,
    },
  });

  const {
    isLoading: isEnrichedApplicationsWithImageStreamsQueryLoading,
    data: enrichedApplications,
  } = useEnrichedApplicationsWithImageStreamsQuery(CDPipelineQuery.data);

  const gitOpsCodebaseQuery = useGitOpsCodebaseQuery();

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
        error: CDPipelineQuery.error as ApiError,
      },
      stages: {
        data: stagesQuery.data?.items,
        isLoading: stagesQuery.isLoading,
        error: stagesQuery.error as ApiError,
      },
      enrichedApplications: {
        data: enrichedApplications,
        isLoading: isEnrichedApplicationsWithImageStreamsQueryLoading,
        error: null,
      },
      gitOpsCodebase: {
        data: gitOpsCodebaseQuery.data,
        isLoading: gitOpsCodebaseQuery.isLoading,
        error: gitOpsCodebaseQuery.error as ApiError,
      },
      QuickLinks: {
        data: QuickLinksQuery.data?.items,
        isLoading: QuickLinksQuery.isLoading,
        error: QuickLinksQuery.error as ApiError,
      },
      QuickLinksURLs: {
        data: QuickLinksURLsQuery.data,
        isLoading: QuickLinksURLsQuery.isLoading,
        error: QuickLinksURLsQuery.error as ApiError,
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
      enrichedApplications,
      gitOpsCodebaseQuery,
      isEnrichedApplicationsWithImageStreamsQueryLoading,
      stagesQuery.data?.items,
      stagesQuery.error,
      stagesQuery.isLoading,
    ]
  );

  return <DataContext.Provider value={DataContextValue}>{children}</DataContext.Provider>;
};
