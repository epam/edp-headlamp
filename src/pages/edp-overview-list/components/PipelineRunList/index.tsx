import { Autocomplete } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { PIPELINE_RUN_STATUS_SELECT_OPTIONS } from '../../../../k8s/PipelineRun/constants';
import { PIPELINE_RUN_LABEL_SELECTOR_CODEBASE } from '../../../../k8s/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { useFilterContext } from '../../../../providers/Filter/hooks';
import { FormControlLabelWithTooltip } from '../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../../../types/forms';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { PipelineRunList } from '../../../../widgets/PipelineRunList';
import { PageFilterExtraControls } from '../../types';

const pipelineRunTypes = [
  PIPELINE_TYPES.ALL,
  PIPELINE_TYPES.BUILD,
  PIPELINE_TYPES.DEPLOY,
  PIPELINE_TYPES.REVIEW,
];

const pipelineRunTypeSelectOptions = pipelineRunTypes.map((value) => ({
  label: capitalizeFirstLetter(value),
  value: value,
}));

export const PipelineRunListWithFilter = () => {
  const [pipelineRuns, setPipelineRuns] = React.useState<PipelineRunKubeObjectInterface[]>(null);

  const [, setError] = React.useState<Error>(null);

  const pipelineCodebases = React.useMemo(() => {
    return new Set(
      pipelineRuns
        ?.map(({ metadata: { labels } }) => labels[PIPELINE_RUN_LABEL_SELECTOR_CODEBASE])
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
      type: null,
      dataHandler: handleStorePipelineRuns,
      errorHandler: handleStreamError,
    });

    return () => cancelStream();
  }, [handleStreamError, handleStorePipelineRuns]);

  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  const { filter, setFilterItem, filterFunction } = useFilterContext<
    PipelineRunKubeObjectInterface,
    PageFilterExtraControls
  >();

  const handleCodebasesChange = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, values: string[]) => {
      setFilterItem('codebases', values);
    },
    [setFilterItem]
  );

  const handleStatusChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      setFilterItem('status', value);
    },
    [setFilterItem]
  );

  const handleTypeChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      setFilterItem('pipelineType', value);
    },
    [setFilterItem]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Filter<PageFilterExtraControls>
          hideFilter={false}
          controls={{
            pipelineType: {
              gridXs: 2,
              component: (
                <FormSelect
                  {...register('type', {
                    onChange: handleTypeChange,
                  })}
                  control={control}
                  errors={errors}
                  name={'type'}
                  label={'Type'}
                  options={pipelineRunTypeSelectOptions}
                  defaultValue={(filter.values.pipelineType as string) ?? PIPELINE_TYPES.ALL}
                />
              ),
            },
            status: {
              gridXs: 2,
              component: (
                <FormSelect
                  {...register('status', {
                    onChange: handleStatusChange,
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
                  defaultValue={(filter.values.status as string) ?? 'All'}
                />
              ),
            },
            codebases: {
              gridXs: 8,
              component: (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <FormControlLabelWithTooltip
                      label={'Codebases'}
                      title={'Applications, libraries, autotests and infrastructures pipelines.'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={
                        pipelineCodebases
                          ? Array.from(pipelineCodebases)
                              .map((el) => el)
                              .filter(Boolean)
                          : []
                      }
                      freeSolo
                      getOptionLabel={(option) => option}
                      onChange={handleCodebasesChange}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select codebases" />
                      )}
                      value={(filter.values.codebases as string[]) ?? []}
                    />
                  </Grid>
                </Grid>
              ),
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <PipelineRunList
          pipelineRuns={pipelineRuns}
          isLoading={pipelineRuns === null}
          filterFunction={filterFunction}
        />
      </Grid>
    </Grid>
  );
};
