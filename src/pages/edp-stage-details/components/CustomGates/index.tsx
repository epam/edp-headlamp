import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { TEKTON_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { usePipelineByTypeListQuery } from '../../../../k8s/Pipeline/hooks/usePipelineByTypeListQuery';
import { useCreateDeployPipelineRun } from '../../../../k8s/PipelineRun/hooks/useCreateDeployPipelineRun';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { parseTektonResourceStatus } from '../../../../utils/parseTektonResourceStatus';
import { useCDPipelineStageContext } from '../../providers/CDPipelineStage/hooks';
import { EDPStageDetailsRouteParams } from '../../types';
import { useColumns } from './hooks/useColumns';
import { CustomGatesProps } from './types';

const pipelineNameFieldName = 'pipelineName';

export const CustomGates = ({
    enrichedApplicationsWithArgoApplications,
    argoApplications,
    latestTenDeployPipelineRuns,
    everyArgoAppIsHealthyAndInSync,
}: CustomGatesProps) => {
    const { namespace, CDPipelineName } = useParams<EDPStageDetailsRouteParams>();
    const columns = useColumns();
    const { stage } = useCDPipelineStageContext();
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
                        argoApplication?.spec?.source?.helm?.parameters?.find(
                            el => el.name === 'image.tag'
                        )?.value || '';

                    const appTag = `${application?.metadata.name}=${deployedVersion}`;
                    acc.push(appTag);
                    return acc;
                }, [])
                .join(' ')
        );
    }, [enrichedApplicationsWithArgoApplications]);

    const handleRunClick = React.useCallback(async (): Promise<void> => {
        await createDeployPipelineRun({
            namespace,
            pipelineName: pipelineNameFieldValue,
            stageName: stageSpecName,
            CDPipelineName,
            codebaseTag,
        });
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
            parseTektonResourceStatus(latestTenDeployPipelineRuns[0]) ===
            TEKTON_RESOURCE_STATUSES.PENDING,
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
    }, [
        everyArgoAppIsHealthyAndInSync,
        latestDeployPipelineRunIsRunning,
        thereAreArgoApplications,
    ]);

    return (
        <Grid container spacing={2} justifyContent={'flex-end'}>
            <Grid item xs={12}>
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
                <HeadlampSimpleTable
                    columns={columns}
                    rowsPerPage={[10]}
                    data={latestTenDeployPipelineRuns}
                />
            </Grid>
        </Grid>
    );
};
