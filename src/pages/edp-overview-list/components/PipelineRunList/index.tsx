import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import {
    PIPELINE_RUN_STATUS,
    PIPELINE_RUN_STATUS_SELECT_OPTIONS,
} from '../../../../k8s/PipelineRun/constants';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { FormControlLabelWithTooltip } from '../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { ValueOf } from '../../../../types/global';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { PipelineRunList } from '../../../../widgets/PipelineRunList';

const pipelineRunTypes = [
    PIPELINE_TYPES.ALL,
    PIPELINE_TYPES.BUILD,
    PIPELINE_TYPES.DEPLOY,
    PIPELINE_TYPES.REVIEW,
];

const pipelineRunTypeSelectOptions = pipelineRunTypes.map(value => ({
    label: capitalizeFirstLetter(value),
    value: value,
}));

export const PipelineRunListOverview = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useForm();

    const [pipelineRuns, setPipelineRuns] = React.useState<PipelineRunKubeObjectInterface[]>(null);
    const [filters, setFilters] = React.useState<{
        type: PIPELINE_TYPES;
        status: ValueOf<typeof PIPELINE_RUN_STATUS> | 'All';
        codebases: string[];
    }>({
        type: null,
        status: null,
        codebases: null,
    });

    const [, setError] = React.useState<Error>(null);

    const filteredPipelineRuns = React.useMemo(() => {
        if (pipelineRuns === null) {
            return;
        }
        let newPipelineRuns = [...pipelineRuns];

        if (filters.status && filters.status !== 'All') {
            newPipelineRuns = newPipelineRuns.filter(
                ({ status: { conditions } }) => conditions[0].status === filters.status
            );
        }

        if (filters.codebases && !!filters.codebases.length) {
            newPipelineRuns = newPipelineRuns.filter(({ metadata: { labels } }) =>
                filters.codebases.includes(labels['app.edp.epam.com/codebase'])
            );
        }

        return newPipelineRuns;
    }, [filters.codebases, filters.status, pipelineRuns]);

    const pipelineCodebases = React.useMemo(() => {
        return new Set(
            pipelineRuns
                ?.map(({ metadata: { labels } }) => labels['app.edp.epam.com/codebase'])
                .filter(Boolean)
        );
    }, [pipelineRuns]);

    const handleStorePipelineRuns = React.useCallback(
        (pipelineRuns: PipelineRunKubeObjectInterface[]) => {
            const sortedPipelineRuns = pipelineRuns.sort(sortKubeObjectByCreationTimestamp);

            setPipelineRuns(sortedPipelineRuns);
        },
        []
    );

    const handleStreamError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = PipelineRunKubeObject.streamPipelineRunListByTypeLabel({
            namespace: getDefaultNamespace(),
            type: filters.type === PIPELINE_TYPES.ALL ? null : filters.type,
            dataHandler: handleStorePipelineRuns,
            errorHandler: handleStreamError,
        });

        return () => cancelStream();
    }, [handleStreamError, handleStorePipelineRuns, filters.type]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems={'flex-end'}>
                    <Grid item xs={2}>
                        <FormSelect
                            {...register('type', {
                                onChange: ({ target: { value } }) =>
                                    setFilters({
                                        ...filters,
                                        type: value,
                                    }),
                            })}
                            control={control}
                            errors={errors}
                            name={'type'}
                            label={'Type'}
                            options={pipelineRunTypeSelectOptions}
                            defaultValue={PIPELINE_TYPES.ALL}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormSelect
                            {...register('status', {
                                onChange: ({ target: { value } }) =>
                                    setFilters({
                                        ...filters,
                                        status: value,
                                    }),
                            })}
                            control={control}
                            errors={errors}
                            name={'status'}
                            label={'Status'}
                            options={[
                                {
                                    label: 'All',
                                    value: 'All',
                                },
                                ...PIPELINE_RUN_STATUS_SELECT_OPTIONS,
                            ]}
                            defaultValue={'All'}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormControlLabelWithTooltip label={'Codebases'} />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    options={
                                        pipelineCodebases
                                            ? Array.from(pipelineCodebases)
                                                  .map(el => el)
                                                  .filter(Boolean)
                                            : []
                                    }
                                    freeSolo
                                    getOptionLabel={option => option}
                                    onChange={(event, value) => {
                                        setFilters({
                                            ...filters,
                                            codebases: value,
                                        });
                                    }}
                                    renderInput={params => (
                                        <TextField {...params} placeholder="Select codebases" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <PipelineRunList
                    pipelineRuns={filteredPipelineRuns}
                    isLoading={pipelineRuns === null}
                />
            </Grid>
        </Grid>
    );
};
