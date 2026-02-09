import {
  Autocomplete,
  FormHelperText,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { PIPELINE_TYPE, PipelineType } from '../../../constants/pipelineTypes';
import { FORM_CONTROL_LABEL_HEIGHT } from '../../../constants/ui';
import { PIPELINE_RUN_STATUS_SELECT_OPTIONS } from '../../../k8s/groups/Tekton/PipelineRun/constants';
import { PIPELINE_RUN_LABEL_SELECTOR_CODEBASE } from '../../../k8s/groups/Tekton/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';
import { NamespaceControl } from '../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../providers/Filter/components/Filter/components/SearchControl';
import { FilterControls } from '../../../providers/Filter/components/Filter/types';
import { useFilterContext } from '../../../providers/Filter/hooks';
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
  pipelineRunTypes: PipelineType[];
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

  const allPipelineTypes = pipelineRunTypes.map((el) => capitalizeFirstLetter(el)).join(' / ');

  const pipelineTypeSelectHelperText = allPipelineTypes
    .split(' / ')
    .slice(0, 5)
    .join(' / ')
    .concat('...');

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
                  <Select
                    onChange={handleTypeChange}
                    name="type"
                    value={(filter.values.pipelineType as string) ?? PIPELINE_TYPE.ALL}
                    label={'Type'}
                    fullWidth
                    sx={{
                      height: (t) => t.typography.pxToRem(32),
                      mt: (t) => t.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT),
                    }}
                  >
                    {pipelineRunTypes.map((value) => (
                      <MenuItem value={value} key={value}>
                        <ListItemText>{capitalizeFirstLetter(value)}</ListItemText>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    <Tooltip title={allPipelineTypes}>
                      <span>{pipelineTypeSelectHelperText}</span>
                    </Tooltip>
                  </FormHelperText>
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
                  <Select
                    onChange={handleStatusChange}
                    name="status"
                    value={(filter.values.status as string) ?? 'All'}
                    label={'Status'}
                    fullWidth
                    sx={{
                      height: (t) => t.typography.pxToRem(32),
                      mt: (t) => t.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT),
                    }}
                  >
                    {[
                      {
                        label: 'All',
                        value: 'All',
                      },
                      ...PIPELINE_RUN_STATUS_SELECT_OPTIONS,
                    ].map((value) => (
                      <MenuItem value={value.value} key={value.value}>
                        <ListItemText>{capitalizeFirstLetter(value.value)}</ListItemText>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Success / Failure / Unknown</FormHelperText>
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
                  getOptionLabel={(option) => option!}
                  // @ts-ignore
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
    handleTypeChange,
    filter.values.pipelineType,
    filter.values.status,
    filter.values.codebases,
    pipelineRunTypes,
    allPipelineTypes,
    pipelineTypeSelectHelperText,
    handleStatusChange,
    pipelineCodebases,
    handleCodebasesChange,
  ]);

  return { controls, filterFunction };
};
