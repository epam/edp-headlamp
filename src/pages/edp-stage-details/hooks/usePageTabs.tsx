import React from 'react';
import { useParams } from 'react-router-dom';
import { PipelineRunKubeObject } from '../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../k8s/PipelineRun/constants';
import { useQuickLinksURLsQuery } from '../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { FormContextProvider } from '../../../providers/Form';
import { PipelineRunList } from '../../../widgets/PipelineRunList';
import { Applications } from '../components/Applications';
import { Monitoring } from '../components/Monitoring';
import { QualityGates } from '../components/QualityGates';
import { useDataContext } from '../providers/Data/hooks';
import { useDynamicDataContext } from '../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams, EnrichedQualityGateWithAutotestPipelineRun } from '../types';
import { useEnrichedApplicationsWithArgoApplications } from './useEnrichedApplicationsWithArgoApplication';
import { useEveryArgoAppIsHealthyAndInSync } from './useEveryArgoAppIsHealthyAndInSync';

export const usePageTabs = () => {
  const { namespace } = useParams<EDPStageDetailsRouteParams>();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);

  const {
    stage,
    autotestPipelineRuns,
    autotestRunnerPipelineRuns,
    deployPipelineRuns,
    argoApplications,
    stageDeployPipelineRuns,
  } = useDynamicDataContext();

  const isLoading = React.useMemo(
    () =>
      stage.isLoading ||
      autotestPipelineRuns.isLoading ||
      autotestRunnerPipelineRuns.isLoading ||
      deployPipelineRuns.isLoading ||
      argoApplications.isLoading ||
      stageDeployPipelineRuns.isLoading,
    [
      argoApplications.isLoading,
      autotestPipelineRuns.isLoading,
      autotestRunnerPipelineRuns.isLoading,
      deployPipelineRuns.isLoading,
      stage.isLoading,
      stageDeployPipelineRuns.isLoading,
    ]
  );

  const { enrichedApplications } = useDataContext();

  const enrichedQualityGatesWithPipelineRuns: EnrichedQualityGateWithAutotestPipelineRun[] =
    React.useMemo(
      () =>
        stage.data?.spec.qualityGates.map((qualityGate) => {
          const autotestPipelineRun = autotestPipelineRuns.data.find(
            (pipelineRun) =>
              pipelineRun.metadata.labels['app.edp.epam.com/codebase'] === qualityGate.autotestName
          );

          return {
            qualityGate: qualityGate,
            autotestPipelineRun: autotestPipelineRun,
          };
        }),
      [stage, autotestPipelineRuns]
    );

  const latestDeployPipelineRunIsRunning = React.useMemo(
    () =>
      PipelineRunKubeObject.parseStatusReason(deployPipelineRuns.data?.[0]).toLowerCase() ===
      PIPELINE_RUN_REASON.RUNNING,
    [deployPipelineRuns]
  );

  const enrichedApplicationsWithArgoApplications = useEnrichedApplicationsWithArgoApplications({
    enrichedApplicationsWithItsImageStreams: enrichedApplications,
    argoApplications: argoApplications.data,
  });

  const everyArgoAppIsHealthyAndInSync = useEveryArgoAppIsHealthyAndInSync(
    enrichedApplicationsWithArgoApplications
  );

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
            pipelineRuns={stageDeployPipelineRuns.data}
            isLoading={stageDeployPipelineRuns.isLoading}
            filterFunction={null}
          />
        ),
      },
      {
        label: 'Quality Gates',
        id: 'quality_gates',
        component: (
          <QualityGates
            enrichedQualityGatesWithPipelineRuns={enrichedQualityGatesWithPipelineRuns}
            argoApplications={argoApplications.data}
            everyArgoAppIsHealthyAndInSync={everyArgoAppIsHealthyAndInSync}
            latestAutotestRunnerPipelineRuns={autotestRunnerPipelineRuns.data}
            latestTenAutotestPipelineRuns={autotestPipelineRuns.data}
          />
        ),
      },
      // {
      //   label: 'Custom Gates',
      //   id: 'custom_gates',
      //   component: (
      //     <CustomGates
      //       enrichedApplicationsWithArgoApplications={enrichedApplicationsWithArgoApplications}
      //       argoApplications={argoApplications.data}
      //       latestTenDeployPipelineRuns={deployPipelineRuns.data}
      //       everyArgoAppIsHealthyAndInSync={everyArgoAppIsHealthyAndInSync}
      //     />
      //   ),
      // },
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
    argoApplications,
    autotestPipelineRuns,
    autotestRunnerPipelineRuns,
    enrichedApplicationsWithArgoApplications,
    enrichedQualityGatesWithPipelineRuns,
    everyArgoAppIsHealthyAndInSync,
    isLoading,
    latestDeployPipelineRunIsRunning,
    stage,
    stageDeployPipelineRuns,
  ]);
};
