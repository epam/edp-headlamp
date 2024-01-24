import { Grid, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PIPELINE_TYPES } from '../../../../constants/pipelineTypes';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import {
  PIPELINE_RUN_STATUS,
  PIPELINE_RUN_STATUS_SELECT_OPTIONS,
} from '../../../../k8s/PipelineRun/constants';
import { PIPELINE_RUN_LABEL_SELECTOR_CODEBASE } from '../../../../k8s/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';
import { FormControlLabelWithTooltip } from '../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FormSelect } from '../../../../providers/Form/components/FormSelect';
import { LOCAL_STORAGE_SERVICE } from '../../../../services/local-storage';
import { ValueOf } from '../../../../types/global';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { sortKubeObjectByCreationTimestamp } from '../../../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { PipelineRunList } from '../../../../widgets/PipelineRunList';

interface Filters {
  type: PIPELINE_TYPES;
  status: ValueOf<typeof PIPELINE_RUN_STATUS> | 'All';
  codebases: string[];
}

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

const defaultFilterCfg = {
  type: null,
  status: null,
  codebases: null,
};

export const PipelineRunListOverview = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const lsFilterItemName = `edp_overview_pipeline_list_filter::${getDefaultNamespace()}`;

  const lsFilterCfg = LOCAL_STORAGE_SERVICE.getItem(lsFilterItemName);

  const filterCfg: Filters = lsFilterCfg ?? defaultFilterCfg;

  const [pipelineRuns, setPipelineRuns] = React.useState<PipelineRunKubeObjectInterface[]>(null);
  const [filters, setFilters] = React.useState<Filters>(filterCfg);

  const [, setError] = React.useState<Error>(null);

  const filteredPipelineRuns = React.useMemo(() => {
    if (pipelineRuns === null) {
      return;
    }
    let newPipelineRuns = [...pipelineRuns];

    if (filters.status && filters.status !== 'All') {
      newPipelineRuns = newPipelineRuns.filter(
        ({ status: { conditions } }) => conditions?.[0]?.status?.toLowerCase() === filters.status
      );
    }

    if (filters.codebases && !!filters.codebases.length) {
      newPipelineRuns = newPipelineRuns.filter(({ metadata: { labels } }) =>
        filters.codebases.includes(labels[PIPELINE_RUN_LABEL_SELECTOR_CODEBASE])
      );
    }

    return newPipelineRuns;
  }, [filters.codebases, filters.status, pipelineRuns]);

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
    if (lsFilterCfg) {
      setValue('type', filters.type);
      setValue('status', filters.status);
    }
  }, [filters.status, filters.type, lsFilterCfg, setValue]);

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
                onChange: ({ target: { value } }) => {
                  setFilters((prev) => {
                    const newFilters = {
                      ...prev,
                      type: value as Filters['type'],
                    };
                    LOCAL_STORAGE_SERVICE.setItem(lsFilterItemName, newFilters);
                    return newFilters;
                  });
                },
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
                onChange: ({ target: { value } }) => {
                  setFilters((prev) => {
                    const newFilters = {
                      ...prev,
                      status: value as Filters['status'],
                    };
                    LOCAL_STORAGE_SERVICE.setItem(lsFilterItemName, newFilters);
                    return newFilters;
                  });
                },
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
                  onChange={(event, value) => {
                    setFilters((prev) => {
                      const newFilters = {
                        ...prev,
                        codebases: value as Filters['codebases'],
                      };
                      LOCAL_STORAGE_SERVICE.setItem(lsFilterItemName, newFilters);
                      return newFilters;
                    });
                  }}
                  renderInput={(params) => <TextField {...params} placeholder="Select codebases" />}
                  value={filters.codebases ?? []}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PipelineRunList pipelineRuns={filteredPipelineRuns} isLoading={pipelineRuns === null} />
      </Grid>
    </Grid>
  );
};
