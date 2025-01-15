import { Autocomplete, FormHelperText, Grid, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { EmptyList } from '../../components/EmptyList';
import { Table } from '../../components/Table';
import { PIPELINE_TYPES } from '../../constants/pipelineTypes';
import { PIPELINE_RUN_STATUS_SELECT_OPTIONS } from '../../k8s/groups/Tekton/PipelineRun/constants';
import { PIPELINE_RUN_LABEL_SELECTOR_CODEBASE } from '../../k8s/groups/Tekton/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { Filter } from '../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { FormSelect } from '../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { getClusterSettings } from '../../utils/getClusterSettings';
import { sortKubeObjectByCreationTimestamp } from '../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { DeletionDialog } from './components/DeleteDialog';
import { PipelineRunFilterAllControlNames, pipelineRunFilterControlNames } from './constants';
import { useColumns } from './hooks/useColumns';
import { useUpperColumns } from './hooks/useUpperColumns';
import { PipelineRunListProps } from './types';

export const PipelineRunList = ({
  pipelineRuns,
  isLoading,
  blockerError,
  errors,
  permissions,
  pipelineRunTypes = [
    PIPELINE_TYPES.ALL,
    PIPELINE_TYPES.REVIEW,
    PIPELINE_TYPES.BUILD,
    PIPELINE_TYPES.DEPLOY,
    PIPELINE_TYPES.CLEAN,
  ],
  filterControls = [
    pipelineRunFilterControlNames.CODEBASES,
    pipelineRunFilterControlNames.STATUS,
    pipelineRunFilterControlNames.PIPELINE_TYPE,
  ],
}: PipelineRunListProps) => {
  const columns = useColumns({ permissions });

  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectAllClick = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      paginatedItems: PipelineRunKubeObjectInterface[]
    ) => {
      if (event.target.checked) {
        const newSelected = paginatedItems.map(({ metadata: { name } }) => name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    []
  );

  const handleSelectRowClick = React.useCallback(
    (event: React.MouseEvent<unknown>, row: PipelineRunKubeObjectInterface) => {
      const name = row.metadata.name;
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const onDelete = React.useCallback(() => {
    setSelected([]);
  }, []);

  const sortedPipelineRuns = React.useMemo(() => {
    return pipelineRuns?.sort(sortKubeObjectByCreationTimestamp);
  }, [pipelineRuns]);

  const upperColumns = useUpperColumns({
    selected,
    onDeleteClick: () => setDeleteDialogOpen(true),
    permissions,
    isEmpty: !pipelineRuns?.length,
  });

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

  const controls = React.useMemo(() => {
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
                    defaultValue={(filter.values.pipelineType as string) ?? PIPELINE_TYPES.ALL}
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

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Filter<PipelineRunFilterAllControlNames> hideFilter={false} controls={controls} />
        </Grid>
        <Grid item xs={12}>
          <Table
            blockerError={blockerError}
            errors={errors}
            columns={columns}
            upperColumns={upperColumns}
            data={sortedPipelineRuns}
            isLoading={isLoading}
            emptyListComponent={<EmptyList missingItemName={'pipeline runs'} />}
            filterFunction={filterFunction}
            handleSelectRowClick={handleSelectRowClick}
            handleSelectAllClick={handleSelectAllClick}
            selected={selected}
            isSelected={(row) => selected.indexOf(row.metadata.name) !== -1}
          />
        </Grid>
      </Grid>
      {deleteDialogOpen && (
        <DeletionDialog
          items={pipelineRuns}
          selected={selected}
          open={deleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
};
