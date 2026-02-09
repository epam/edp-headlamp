import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { TabSection } from '../../../../components/TabSection';
import { useArgoApplicationCRUD } from '../../../../k8s/groups/ArgoCD/Application/hooks/useArgoApplicationCRUD';
import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';
import {
  APPLICATIONS_TABLE_MODE,
  IMAGE_TAG_POSTFIX,
  VALUES_OVERRIDE_POSTFIX,
} from '../../constants';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams, EnrichedApplicationWithArgoApplication } from '../../types';
import { ConfigurationTable } from './components/ConfigurationTable';
import { PreviewTable } from './components/PreviewTable';
import { useButtonsEnabledMap } from './hooks/useButtonsEnabled';
import { useColumns } from './hooks/useColumns';
import { useConfigurationHandlers } from './hooks/useConfigurationHandlers';
import { ApplicationsProps, ApplicationsTableMode } from './types';

export const Applications = ({
  enrichedApplicationsWithArgoApplications,
  latestDeployPipelineRunIsRunning,
  latestCleanPipelineRunIsRunning,
}: ApplicationsProps) => {
  const allArgoApplications = enrichedApplicationsWithArgoApplications.reduce<
    ApplicationKubeObjectInterface[]
  >((acc, cur) => {
    if (cur.argoApplication) acc.push(cur.argoApplication);
    return acc;
  }, []);

  const enrichedApplicationsByApplicationName = React.useMemo(() => {
    return (
      enrichedApplicationsWithArgoApplications &&
      enrichedApplicationsWithArgoApplications.reduce((acc, cur) => {
        acc.set(cur.application.metadata.name, cur);
        return acc;
      }, new Map<string, EnrichedApplicationWithArgoApplication>())
    );
  }, [enrichedApplicationsWithArgoApplications]);

  const {
    deleteArgoApplication,
    mutations: { argoApplicationDeleteMutation },
  } = useArgoApplicationCRUD();

  const [mode, setMode] = React.useState<ApplicationsTableMode>(APPLICATIONS_TABLE_MODE.PREVIEW);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const [dataSnapshot, setDataSnapshot] = React.useState<EnrichedApplicationWithArgoApplication[]>(
    []
  );

  const toggleMode = React.useCallback(() => {
    mode === APPLICATIONS_TABLE_MODE.PREVIEW
      ? setMode(APPLICATIONS_TABLE_MODE.CONFIGURATION)
      : setMode(APPLICATIONS_TABLE_MODE.PREVIEW);
    setDataSnapshot(enrichedApplicationsWithArgoApplications);
  }, [mode, enrichedApplicationsWithArgoApplications]);

  const {
    handleClickDeploy,
    handleClickClean,
    handleClickLatest,
    handleClickOverrideValuesAll,
    handleClickStable,
  } = useConfigurationHandlers({
    enrichedApplicationsByApplicationName,
    enrichedApplicationsWithArgoApplications,
    setDeleteDialogOpen,
  });

  const { watch } = useFormContext();

  const values = watch();

  const buttonsHighlighted = React.useMemo(() => {
    const valuesArray = Object.entries(values);
    const imageTagsValues = valuesArray.filter(([key]) => key && key.includes(IMAGE_TAG_POSTFIX));
    const valuesOverrides = valuesArray.filter(
      ([key]) => key && key.includes(VALUES_OVERRIDE_POSTFIX)
    );

    if (!imageTagsValues.length) {
      return {
        latest: false,
        stable: false,
        valuesOverride: false,
      };
    }

    const allVersionsAreLatest = imageTagsValues.every(([, value]) => value?.includes('latest::'));
    const allVersionsAreStable = imageTagsValues.every(([, value]) => value?.includes('stable::'));
    const allAppsHasValuesOverride = valuesOverrides.every(([, value]) => value === true);

    return {
      latest: allVersionsAreLatest,
      stable: allVersionsAreStable,
      valuesOverride: allAppsHasValuesOverride,
    };
  }, [values]);

  const { CDPipelineName } = useParams<EDPStageDetailsRouteParams>();

  const { stage } = useDynamicDataContext();

  const copyVersionsValue = React.useMemo(() => {
    const copyTextVersions = enrichedApplicationsWithArgoApplications.reduce((acc, cur) => {
      const { application } = cur;
      const { name } = application.metadata;
      const deployedVersion = cur.argoApplication?.spec?.source?.targetRevision;

      return acc + `${name}:${deployedVersion}\n`;
    }, '');

    return `flow: ${CDPipelineName}, env: ${stage.data!.spec.name}, ns: ${
      stage.data!.spec.namespace
    }\n\n${copyTextVersions} \n\n`;
  }, [CDPipelineName, enrichedApplicationsWithArgoApplications, stage.data]);

  const columns = useColumns({
    mode,
    handleClickLatest,
    handleClickOverrideValuesAll,
    handleClickStable,
    buttonsHighlighted,
    copyVersionsValue,
  });

  const [deployBtnDisabled, setDeployBtnDisabled] = React.useState(false);

  const someArgoApplicationMutationIsLoading = React.useMemo(
    () => argoApplicationDeleteMutation.isLoading,
    [argoApplicationDeleteMutation]
  );

  const buttonsEnabledMap = useButtonsEnabledMap({
    enrichedApplicationsWithArgoApplications,
    enrichedApplicationsByApplicationName,
    latestDeployPipelineRunIsRunning,
    someArgoApplicationMutationIsLoading,
  });

  return (
    <TabSection
      title={
        <Stack spacing={1} alignItems="center" direction="row">
          <Typography fontSize={28} color="primary.dark">
            Applications
          </Typography>
        </Stack>
      }
    >
      {mode === APPLICATIONS_TABLE_MODE.PREVIEW && (
        <>
          <PreviewTable
            data={enrichedApplicationsWithArgoApplications}
            columns={columns}
            allArgoApplications={allArgoApplications}
            deleteDialogOpen={deleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            deleteArgoApplication={deleteArgoApplication}
            deployBtnDisabled={deployBtnDisabled}
            latestDeployPipelineRunIsRunning={latestDeployPipelineRunIsRunning}
            latestCleanPipelineRunIsRunning={latestCleanPipelineRunIsRunning}
            toggleMode={toggleMode}
            handleClickClean={handleClickClean}
            buttonsEnabledMap={buttonsEnabledMap}
          />
        </>
      )}

      {mode === APPLICATIONS_TABLE_MODE.CONFIGURATION && (
        <ConfigurationTable
          data={dataSnapshot}
          columns={columns}
          setMode={setMode}
          deployBtnDisabled={deployBtnDisabled}
          setDeployBtnDisabled={setDeployBtnDisabled}
          latestDeployPipelineRunIsRunning={latestDeployPipelineRunIsRunning}
          handleClickDeploy={handleClickDeploy}
          buttonsEnabledMap={buttonsEnabledMap}
          buttonsHighlighted={buttonsHighlighted}
        />
      )}
    </TabSection>
  );
};
