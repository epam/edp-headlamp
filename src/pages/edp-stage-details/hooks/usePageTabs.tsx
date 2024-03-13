import React from 'react';
import { useParams } from 'react-router-dom';
import { PipelineRunKubeObject } from '../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../k8s/PipelineRun/constants';
import { useQuickLinksURLsQuery } from '../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { FormContextProvider } from '../../../providers/Form';
import { PipelineRunList } from '../../../widgets/PipelineRunList';
import { Applications } from '../components/Applications';
import { Monitoring } from '../components/Monitoring';
import { useDataContext } from '../providers/Data/hooks';
import { useDynamicDataContext } from '../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams } from '../types';
import { useEnrichedApplicationsWithArgoApplications } from './useEnrichedApplicationsWithArgoApplication';

export const usePageTabs = () => {
  const { namespace } = useParams<EDPStageDetailsRouteParams>();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);

  const {
    stage,
    autotestPipelineRuns,
    autotestRunnerPipelineRuns,
    deployPipelineRuns,
    argoApplications,
  } = useDynamicDataContext();

  const isLoading = React.useMemo(
    () =>
      stage.isLoading ||
      autotestPipelineRuns.isLoading ||
      autotestRunnerPipelineRuns.isLoading ||
      deployPipelineRuns.isLoading ||
      argoApplications.isLoading,
    [
      argoApplications.isLoading,
      autotestPipelineRuns.isLoading,
      autotestRunnerPipelineRuns.isLoading,
      deployPipelineRuns.isLoading,
      stage.isLoading,
    ]
  );

  const { enrichedApplications } = useDataContext();

  const latestDeployPipelineRunIsRunning = React.useMemo(() => {
    const latestNewDeployPipelineRun = deployPipelineRuns.data?.find((el) => {
      return el.jsonData?.actionType === 'MODIFIED';
    })?.jsonData;

    if (!latestNewDeployPipelineRun) {
      return false;
    }

    return (
      !latestNewDeployPipelineRun?.status ||
      PipelineRunKubeObject.parseStatusReason(latestNewDeployPipelineRun)?.toLowerCase() ===
        PIPELINE_RUN_REASON.RUNNING
    );
  }, [deployPipelineRuns]);

  const enrichedApplicationsWithArgoApplications = useEnrichedApplicationsWithArgoApplications({
    enrichedApplicationsWithItsImageStreams: enrichedApplications,
    argoApplications: argoApplications.data,
  });

  return React.useMemo(() => {
    if (isLoading) {
      return [];
    }

    return [
      {
        label: 'Applications',
        id: 'applications',
        component: (
          <FormContextProvider formSettings={{ mode: 'onBlur' }}>
            <Applications
              enrichedApplicationsWithArgoApplications={enrichedApplicationsWithArgoApplications}
              latestDeployPipelineRunIsRunning={latestDeployPipelineRunIsRunning}
            />
          </FormContextProvider>
        ),
      },
      {
        label: 'Pipelines',
        id: 'pipelines',
        component: (
          <PipelineRunList
            pipelineRuns={deployPipelineRuns.data}
            isLoading={deployPipelineRuns.isLoading}
            filterFunction={null}
          />
        ),
      },
      {
        label: 'Monitoring',
        id: 'monitoring',
        component: (
          <Monitoring
            grafanaBaseUrl={QuickLinksURLS?.grafana}
            namespace={stage.data?.spec.namespace}
          />
        ),
      },
    ];
  }, [
    QuickLinksURLS,
    deployPipelineRuns,
    enrichedApplicationsWithArgoApplications,
    isLoading,
    latestDeployPipelineRunIsRunning,
    stage,
  ]);
};
