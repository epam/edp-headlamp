import React from 'react';
import { useParams } from 'react-router-dom';
import { BorderedSection } from '../../../components/BorderedSection';
import { InfoColumns } from '../../../components/InfoColumns';
import { LoadingWrapper } from '../../../components/LoadingWrapper';
import { TabSection } from '../../../components/TabSection';
import { useQuickLinksURLsQuery } from '../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { PipelineRunKubeObject } from '../../../k8s/groups/Tekton/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../k8s/groups/Tekton/PipelineRun/constants';
import { PipelineRunList } from '../../../widgets/PipelineRunList';
import { ApplicationsWrapper } from '../components/ApplicationsWrapper';
import { Monitoring } from '../components/Monitoring';
import { useDataContext } from '../providers/Data/hooks';
import { useDynamicDataContext } from '../providers/DynamicData/hooks';
import { usePermissionsContext } from '../providers/Permissions/hooks';
import { EDPStageDetailsRouteParams } from '../types';
import { useEnrichedApplicationsWithArgoApplications } from './useEnrichedApplicationsWithArgoApplication';
import { useInfoColumns } from './useInfoColumns';

export const usePageTabs = () => {
  const { namespace } = useParams<EDPStageDetailsRouteParams>();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);

  const {
    stage,
    autotestPipelineRuns,
    autotestRunnerPipelineRuns,
    deployPipelineRuns,
    cleanPipelineRuns,
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
    const latestNewDeployPipelineRun = deployPipelineRuns.data?.[0];

    if (!latestNewDeployPipelineRun) {
      return false;
    }

    return (
      !latestNewDeployPipelineRun?.status ||
      PipelineRunKubeObject.parseStatusReason(latestNewDeployPipelineRun)?.toLowerCase() ===
        PIPELINE_RUN_REASON.RUNNING
    );
  }, [deployPipelineRuns]);

  const latestCleanPipelineRunIsRunning = React.useMemo(() => {
    const latestNewCleanPipelineRun = cleanPipelineRuns.data?.[0];

    if (!latestNewCleanPipelineRun) {
      return false;
    }

    return (
      !latestNewCleanPipelineRun?.status ||
      PipelineRunKubeObject.parseStatusReason(latestNewCleanPipelineRun)?.toLowerCase() ===
        PIPELINE_RUN_REASON.RUNNING
    );
  }, [cleanPipelineRuns]);

  const enrichedApplicationsWithArgoApplications = useEnrichedApplicationsWithArgoApplications();

  const { pipelineRun: pipelineRunPermissions } = usePermissionsContext();
  const infoColumns = useInfoColumns();

  return React.useMemo(() => {
    const _isLoading = isLoading || enrichedApplications.isLoading || argoApplications.isLoading;

    return [
      {
        label: 'Overview',
        id: 'overview',
        component: (
          <LoadingWrapper isLoading={_isLoading}>
            <TabSection title="Overview">
              <BorderedSection title="Stage Details">
                <div>
                  <InfoColumns infoRows={infoColumns} />
                </div>
              </BorderedSection>
            </TabSection>
          </LoadingWrapper>
        ),
      },
      {
        label: 'Applications',
        id: 'applications',
        component: (
          <LoadingWrapper isLoading={_isLoading}>
            <ApplicationsWrapper
              enrichedApplicationsWithArgoApplications={enrichedApplicationsWithArgoApplications}
              latestDeployPipelineRunIsRunning={latestDeployPipelineRunIsRunning}
              latestCleanPipelineRunIsRunning={latestCleanPipelineRunIsRunning}
            />
          </LoadingWrapper>
        ),
      },
      {
        label: 'Pipelines',
        id: 'pipelines',
        component: (
          <LoadingWrapper isLoading={_isLoading}>
            <TabSection title="Pipelines">
              <PipelineRunList
                pipelineRuns={deployPipelineRuns.data}
                isLoading={deployPipelineRuns.isLoading}
                filterFunction={null}
                permissions={pipelineRunPermissions}
              />
            </TabSection>
          </LoadingWrapper>
        ),
      },
      {
        label: 'Monitoring',
        id: 'monitoring',
        component: (
          <LoadingWrapper isLoading={_isLoading}>
            <TabSection title="Monitoring">
              <Monitoring
                grafanaBaseUrl={QuickLinksURLS?.grafana}
                namespace={stage.data?.spec.namespace}
              />
            </TabSection>
          </LoadingWrapper>
        ),
      },
    ];
  }, [
    QuickLinksURLS?.grafana,
    argoApplications.isLoading,
    deployPipelineRuns.data,
    deployPipelineRuns.isLoading,
    enrichedApplications.isLoading,
    enrichedApplicationsWithArgoApplications,
    infoColumns,
    isLoading,
    latestCleanPipelineRunIsRunning,
    latestDeployPipelineRunIsRunning,
    pipelineRunPermissions,
    stage.data?.spec.namespace,
  ]);
};
