import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CODEBASE_TYPE } from '../../../../constants/codebaseTypes';
import { ApplicationKubeObject } from '../../../../k8s/groups/ArgoCD/Application';
import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import { CDPipelineKubeObject } from '../../../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectInterface } from '../../../../k8s/groups/EDP/CDPipeline/types';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE } from '../../../../k8s/groups/EDP/Codebase/labels';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { useQuickLinksQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksQuery';
import { useQuickLinksURLsQuery } from '../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { StageKubeObject } from '../../../../k8s/groups/EDP/Stage';
import { STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME } from '../../../../k8s/groups/EDP/Stage/labels';
import { StageKubeObjectInterface } from '../../../../k8s/groups/EDP/Stage/types';
import { CDPipelineRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<CDPipelineRouteParams>();

  const [_CDPipeline, CDPipelineGetError] = CDPipelineKubeObject.useGet(name, namespace);

  const CDPipeline = _CDPipeline as
    | {
        jsonData: CDPipelineKubeObjectInterface;
      }
    | null
    | undefined;

  const [_stages, stagesError] = StageKubeObject.useList({
    namespace,
    labelSelector: `${STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME}=${name}`,
  });

  const stages = _stages as StageKubeObjectInterface[] | null;

  const sortedStages = React.useMemo(() => {
    if (stages === null) {
      return null;
    }

    return stages.sort((a, b) => a.spec.order - b.spec.order).map((el) => el.jsonData);
  }, [stages]);

  const [_applications, applicationsError] = CodebaseKubeObject.useList({
    namespace,
    labelSelector: `${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${CODEBASE_TYPE.APPLICATION}`,
  });

  const applications = _applications as CodebaseKubeObjectInterface[] | null;

  const [_argoApplications, argoApplicationsError] = ApplicationKubeObject.useList({
    namespace,
    labelSelector: `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${name}`,
  });

  const argoApplications = _argoApplications as ApplicationKubeObjectInterface[] | null;

  const stagesWithApplicationsData = React.useMemo(() => {
    if (!applications || !argoApplications || !stages) {
      return null;
    }

    const argoApplicationsMap = argoApplications.reduce<
      Record<string, ApplicationKubeObjectInterface>
    >((map, argoApplication) => {
      const appName = argoApplication.metadata?.labels?.[APPLICATION_LABEL_SELECTOR_APP_NAME];
      const stageName = argoApplication.metadata?.labels?.[APPLICATION_LABEL_SELECTOR_STAGE];

      if (appName && stageName) {
        map[`${appName}${stageName}`] = argoApplication;
      }

      return map;
    }, {});

    return stages.map((stage) => ({
      stage,
      applications: applications.map((application) => {
        const argoApplication =
          argoApplicationsMap[`${application?.metadata.name}${stage.spec.name}`];
        return { application, argoApplication };
      }),
    }));
  }, [applications, argoApplications, stages]);

  const quickLinksQuery = useQuickLinksQuery(namespace);

  const quickLinksURLsQuery = useQuickLinksURLsQuery();

  const contextValue = React.useMemo(
    () => ({
      CDPipeline: {
        data: CDPipeline?.jsonData,
        error: CDPipelineGetError,
        isLoading: CDPipeline === null && !CDPipelineGetError,
      },
      stages: {
        data: sortedStages,
        error: stagesError,
        isLoading: sortedStages === null && !stagesError,
      },
      stagesWithApplicationsData: {
        data: stagesWithApplicationsData!,
        error: applicationsError || argoApplicationsError,
        isLoading:
          stagesWithApplicationsData === null && !applicationsError && !argoApplicationsError,
      },
      quickLinksURLs: {
        data: quickLinksURLsQuery.data,
        error: quickLinksURLsQuery.error as ApiError,
        isLoading: quickLinksURLsQuery.isLoading,
      },
      quickLinks: {
        data: quickLinksQuery.data,
        error: quickLinksQuery.error as ApiError,
        isLoading: quickLinksQuery.isLoading,
      },
    }),
    [
      CDPipeline,
      CDPipelineGetError,
      applicationsError,
      argoApplicationsError,
      quickLinksQuery.data,
      quickLinksQuery.error,
      quickLinksQuery.isLoading,
      quickLinksURLsQuery.data,
      quickLinksURLsQuery.error,
      quickLinksURLsQuery.isLoading,
      sortedStages,
      stagesError,
      stagesWithApplicationsData,
    ]
  );

  return <DynamicDataContext.Provider value={contextValue}>{children}</DynamicDataContext.Provider>;
};
