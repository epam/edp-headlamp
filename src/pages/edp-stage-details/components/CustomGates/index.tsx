import { Button, Grid } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { usePipelineByTypeListQuery } from '../../../../k8s/Pipeline/hooks/usePipelineByTypeListQuery';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { PIPELINE_RUN_REASON } from '../../../../k8s/PipelineRun/constants';
import { useCreateDeployPipelineRun } from '../../../../k8s/PipelineRun/hooks/useCreateDeployPipelineRun';
import { createDeployPipelineRunInstance } from '../../../../k8s/PipelineRun/utils/createDeployPipelineRunInstance';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { PipelineRunList } from '../../../../widgets/PipelineRunList';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams } from '../../types';
import { CustomGatesProps } from './types';

const pipelineNameFieldName = 'pipelineName';

export const CustomGates = ({
  enrichedApplicationsWithArgoApplications,
  argoApplications,
  latestTenDeployPipelineRuns,
  everyArgoAppIsHealthyAndInSync,
}: CustomGatesProps) => {
  const { namespace, CDPipelineName } = useParams<EDPStageDetailsRouteParams>();
  const {
    stage: { data: stage },
  } = useDynamicDataContext();
  const stageSpecName = stage?.spec.name;

  const {
    control,
    formState: { errors },
    watch,
  } = useForm();

  const { data: pipelines } = usePipelineByTypeListQuery({
    props: {
      pipelineType: PIPELINE_TYPES.DEPLOY,
    },
  });

  const pipelineOptions = React.useMemo(
    () =>
      pipelines && pipelines?.items?.length
        ? pipelines?.items.map(({ metadata: { name } }) => ({
            label: name,
            value: name,
          }))
        : [],
    [pipelines]
  );

  const pipelineNameFieldValue = watch(pipelineNameFieldName);

  const { createDeployPipelineRun } = useCreateDeployPipelineRun({});

  const codebaseTag = React.useMemo(() => {
    return (
      enrichedApplicationsWithArgoApplications &&
      enrichedApplicationsWithArgoApplications
        .reduce((acc, { application, argoApplication }) => {
          if (!argoApplication) {
            return [];
          }

          const deployedVersion =
            argoApplication?.spec?.source?.helm?.parameters?.find((el) => el.name === 'image.tag')
              ?.value || '';

          const appTag = `${application?.metadata.name}=${deployedVersion}`;
          acc.push(appTag);
          return acc;
        }, [])
        .join(' ')
    );
  }, [enrichedApplicationsWithArgoApplications]);

  const handleRunClick = React.useCallback(async (): Promise<void> => {
    const newDeployPipelineRun = createDeployPipelineRunInstance({
      namespace,
      pipelineName: pipelineNameFieldValue,
      stageName: stageSpecName,
      CDPipelineName,
      codebaseTag,
    });
    await createDeployPipelineRun({ deployPipelineRun: newDeployPipelineRun });
  }, [
    createDeployPipelineRun,
    namespace,
    pipelineNameFieldValue,
    stageSpecName,
    CDPipelineName,
    codebaseTag,
  ]);

  const latestDeployPipelineRunIsRunning = React.useMemo(
    () =>
      PipelineRunKubeObject.parseStatusReason(latestTenDeployPipelineRuns?.[0]) ===
      PIPELINE_RUN_REASON.RUNNING,
    [latestTenDeployPipelineRuns]
  );

  const thereAreArgoApplications = React.useMemo(
    () => argoApplications.length,
    [argoApplications.length]
  );

  const deployPipelineRunActionEnabled = React.useMemo(() => {
    if (!thereAreArgoApplications || latestDeployPipelineRunIsRunning) {
      return false;
    }

    return everyArgoAppIsHealthyAndInSync;
  }, [everyArgoAppIsHealthyAndInSync, latestDeployPipelineRunIsRunning, thereAreArgoApplications]);

  return (
    <Grid container spacing={2} justifyContent={'flex-end'}>
      <Grid item xs={4}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item style={{ flexGrow: 1 }}>
            <FormSelect
              control={control}
              errors={errors}
              name={pipelineNameFieldName}
              options={pipelineOptions}
              disabled={pipelineOptions && !pipelineOptions.length}
              placeholder={'Select pipeline name'}
            />
          </Grid>
          <Grid item>
            <Button
              component={'button'}
              type={'button'}
              variant={'contained'}
              color={'primary'}
              size={'small'}
              disabled={!deployPipelineRunActionEnabled || !pipelineNameFieldValue}
              onClick={handleRunClick}
            >
              Run
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PipelineRunList
          pipelineRuns={latestTenDeployPipelineRuns}
          isLoading={!latestTenDeployPipelineRuns}
          filterFunction={null}
        />
      </Grid>
    </Grid>
  );
};
