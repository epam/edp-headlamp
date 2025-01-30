import { Autocomplete, FormHelperText, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PIPELINE_TYPE } from '../../../constants/pipelineTypes';
import { PIPELINE_RUN_STATUS_SELECT_OPTIONS } from '../../../k8s/groups/Tekton/PipelineRun/constants';
import { PIPELINE_RUN_LABEL_SELECTOR_CODEBASE } from '../../../k8s/groups/Tekton/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';
import { NamespaceControl } from '../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../providers/Filter/components/Filter/components/SearchControl';
import { FilterControls } from '../../../providers/Filter/components/Filter/types';
import { useFilterContext } from '../../../providers/Filter/hooks';
import { FormSelect } from '../../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../../types/forms';
import { capitalizeFirstLetter } from '../../../utils/format/capitalizeFirstLetter';
import { getClusterSettings } from '../../../utils/getClusterSettings';
import { pipelineRunFilterControlNames } from '../constants';
import { PipelineRunFilterAllControlNames } from '../types';

type FilterControlsType = FilterControls<PipelineRunFilterAllControlNames>;

export const useFilter = ({
  pipelineRuns,
  pipelineRunTypes,
  filterControls,
}: {
  pipelineRuns: PipelineRunKubeObjectInterface[];
  pipelineRunTypes: PIPELINE_TYPE[];
  filterControls: PipelineRunFilterAllControlNames[];
}): {
  controls: FilterControlsType;
  filterFunction: (...args: PipelineRunKubeObjectInterface[]) => boolean;
} => {
  const pipelineCodebases = React.useMemo(() => {
    return new Set(
      pipelineRuns
        ?.map(({ metadata: { labels } }) => labels?.[PIPELINE_RUN_LABEL_SELECTOR_CODEBASE])
        .filter(Boolean)
    );
  }, [pipelineRuns]);

  const {
    register,
    control,
    formState: { errors: formErrors },
  } = useForm();
  const { filter, setFilterItem, filterFunction } = useFilterContext<
    PipelineRunKubeObjectInterface,
    PipelineRunFilterAllControlNames
  >();

  const handleCodebasesChange = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, values: string[]) => {
      setFilterItem(pipelineRunFilterControlNames.CODEBASES, values);
    },
    [setFilterItem]
  );

  const handleStatusChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      setFilterItem(pipelineRunFilterControlNames.STATUS, value);
    },
    [setFilterItem]
  );

  const handleTypeChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      setFilterItem(pipelineRunFilterControlNames.PIPELINE_TYPE, value);
    },
    [setFilterItem]
  );

  const typesLabel = pipelineRunTypes.map((el) => capitalizeFirstLetter(el)).join('/');

  const controls: FilterControlsType = React.useMemo(() => {
    return {
      search: {
        component: (
          <div>
            <SearchControl />
            <FormHelperText> </FormHelperText>
          </div>
        ),
      },
      ...((getClusterSettings()?.allowedNamespaces || []).length > 1
        ? {
            namespace: {
              component: (
                <div>
                  <NamespaceControl />
                  <FormHelperText> </FormHelperText>
                </div>
              ),
            },
          }
        : {}),
      ...(filterControls.includes(pipelineRunFilterControlNames.PIPELINE_TYPE)
        ? {
            pipelineType: {
              gridXs: 2,
              component: (
                <>
                  <FormSelect
                    {...register('type', {
                      onChange: handleTypeChange,
                    })}
                    control={control}
                    errors={formErrors}
                    name={'type'}
                    label={'Type'}
                    options={pipelineRunTypes.map((value) => ({
                      label: capitalizeFirstLetter(value),
                      value: value,
                    }))}
                    // TODO: fix types
                    // @ts-ignore
                    defaultValue={(filter.values.pipelineType as string) ?? PIPELINE_TYPE.ALL}
                  />
                  <FormHelperText>{typesLabel}</FormHelperText>
                </>
              ),
            },
          }
        : {}),
      ...(filterControls.includes(pipelineRunFilterControlNames.STATUS)
        ? {
            status: {
              gridXs: 2,
              component: (
                <>
                  <FormSelect
                    {...register('status', {
                      onChange: handleStatusChange,
                    })}
                    control={control}
                    errors={formErrors}
                    name={'status'}
                    label={'Status'}
                    options={[
                      {
                        label: 'All',
                        value: 'All',
                      },
                      ...PIPELINE_RUN_STATUS_SELECT_OPTIONS,
                    ]}
                    // TODO: fix types
                    // @ts-ignore
                    defaultValue={(filter.values.status as string) ?? 'All'}
                  />
                  <FormHelperText>Success/Failure/Unknown</FormHelperText>
                </>
              ),
            },
          }
        : {}),
      ...(filterControls.includes(pipelineRunFilterControlNames.CODEBASES)
        ? {
            codebases: {
              gridXs: 6,
              component: (
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
                    <TextField
                      {...params}
                      label="Codebases"
                      placeholder="Select codebases"
                      helperText="Applications, libraries, autotests and infrastructures pipelines."
                    />
                  )}
                  // TODO: fix types
                  // @ts-ignore
                  value={(filter.values.codebases as string[]) ?? []}
                  ChipProps={{
                    size: 'small',
                    color: 'primary',
                  }}
                />
              ),
            },
          }
        : {}),
    };
  }, [
    filterControls,
    register,
    handleTypeChange,
    control,
    formErrors,
    pipelineRunTypes,
    filter.values.pipelineType,
    filter.values.status,
    filter.values.codebases,
    typesLabel,
    handleStatusChange,
    pipelineCodebases,
    handleCodebasesChange,
  ]);

  return { controls, filterFunction };
};
