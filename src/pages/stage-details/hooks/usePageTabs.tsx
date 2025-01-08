import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BorderedSection } from '../../../components/BorderedSection';
import { EmptyList } from '../../../components/EmptyList';
import { InfoColumns } from '../../../components/InfoColumns';
import { LearnMoreLink } from '../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../components/LoadingWrapper';
import { TabSection } from '../../../components/TabSection';
import { PIPELINE_TYPES } from '../../../constants/pipelineTypes';
import { EDP_USER_GUIDE } from '../../../constants/urls';
import { SYSTEM_QUICK_LINKS } from '../../../k8s/groups/EDP/QuickLink/constants';
import { useQuickLinksQuery } from '../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksQuery';
import { useQuickLinksURLsQuery } from '../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { QUICK_LINK_LABEL_SELECTOR_TYPE } from '../../../k8s/groups/EDP/QuickLink/labels';
import { PipelineRunKubeObject } from '../../../k8s/groups/Tekton/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../k8s/groups/Tekton/PipelineRun/constants';
import { FilterContextProvider } from '../../../providers/Filter/provider';
import { Tab } from '../../../providers/Tabs/components/Tabs/types';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { PipelineRunList } from '../../../widgets/PipelineRunList';
import { FILTER_CONTROLS, matchFunctions } from '../../../widgets/PipelineRunList/constants';
import { ApplicationsWrapper } from '../components/ApplicationsWrapper';
import { Monitoring } from '../components/Monitoring';
import { Variables } from '../components/Variables';
import { useDataContext } from '../providers/Data/hooks';
import { useDynamicDataContext } from '../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams } from '../types';
import { useEnrichedApplicationsWithArgoApplications } from './useEnrichedApplicationsWithArgoApplication';
import { useInfoColumns } from './useInfoColumns';
import { useTypedPermissions } from './useTypedPermissions';

export const usePageTabs = (): Tab[] => {
  const { namespace, stageName } = useParams<EDPStageDetailsRouteParams>();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);
  const { data: QuickLinks } = useQuickLinksQuery({
    props: {
      namespace,
    },
  });

  const monitoringQuickLink =
    QuickLinks &&
    QuickLinks?.items?.find((el) => el.metadata.name === SYSTEM_QUICK_LINKS.MONITORING);

  const {
    stage,
    pipelineRuns,
    deployPipelineRuns,
    cleanPipelineRuns,
    argoApplications,
    newPipelineRunAdded,
    setNewPipelineRunAdded,
    variablesConfigMap,
  } = useDynamicDataContext();

  const isLoading = React.useMemo(
    () => stage.isLoading || deployPipelineRuns.isLoading || argoApplications.isLoading,
    [argoApplications.isLoading, deployPipelineRuns.isLoading, stage.isLoading]
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

  const permissions = useTypedPermissions();
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
              <FilterContextProvider
                entityID={`PIPELINE_RUN_LIST_STAGE_DETAILS::${getDefaultNamespace()}`}
                matchFunctions={matchFunctions}
                saveToLocalStorage
              >
                <PipelineRunList
                  pipelineRuns={pipelineRuns.data}
                  isLoading={pipelineRuns.isLoading}
                  blockerError={pipelineRuns.error}
                  permissions={permissions}
                  pipelineRunTypes={[
                    PIPELINE_TYPES.ALL,
                    PIPELINE_TYPES.DEPLOY,
                    PIPELINE_TYPES.CLEAN,
                  ]}
                  filterControls={[FILTER_CONTROLS.PIPELINE_TYPE, FILTER_CONTROLS.STATUS]}
                />
              </FilterContextProvider>
            </TabSection>
          </LoadingWrapper>
        ),
        highlightNew: newPipelineRunAdded,
        onClick: () => setNewPipelineRunAdded(false),
      },
      {
        label: 'Variables',
        id: 'variables',
        component: (
          <LoadingWrapper isLoading={variablesConfigMap.isLoading && !variablesConfigMap.error}>
            <TabSection
              title={
                <>
                  <Typography fontSize={28} color="primary.dark" component="span">
                    Variables
                  </Typography>{' '}
                  <LearnMoreLink url={EDP_USER_GUIDE.VARIABLES_INJECTION.url} />
                </>
              }
            >
              {variablesConfigMap.data ? (
                <Variables configMap={variablesConfigMap.data?.jsonData} />
              ) : (
                <EmptyList missingItemName={`ConfigMap ${stageName} is not found.`} />
              )}
            </TabSection>
          </LoadingWrapper>
        ),
      },
      {
        label: 'Monitoring',
        id: 'monitoring',
        disabled: !monitoringQuickLink,
        component: (
          <LoadingWrapper isLoading={_isLoading}>
            <TabSection title="Monitoring">
              <Monitoring
                provider={monitoringQuickLink?.metadata?.labels[QUICK_LINK_LABEL_SELECTOR_TYPE]}
                baseUrl={QuickLinksURLS?.monitoring}
                namespace={stage.data?.spec.namespace}
                clusterName={stage.data?.spec.clusterName}
              />
            </TabSection>
          </LoadingWrapper>
        ),
      },
    ];
  }, [
    QuickLinksURLS?.monitoring,
    argoApplications.isLoading,
    enrichedApplications.isLoading,
    enrichedApplicationsWithArgoApplications,
    infoColumns,
    isLoading,
    latestCleanPipelineRunIsRunning,
    latestDeployPipelineRunIsRunning,
    monitoringQuickLink,
    newPipelineRunAdded,
    permissions,
    pipelineRuns.data,
    pipelineRuns.error,
    pipelineRuns.isLoading,
    setNewPipelineRunAdded,
    stage.data?.spec.namespace,
    stageName,
    variablesConfigMap.data,
    variablesConfigMap.error,
    variablesConfigMap.isLoading,
  ]);
};
