import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { codebaseTypeSelectOptions } from '../../../../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { NamespaceControl } from '../../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../../providers/Filter/components/Filter/components/SearchControl';
import { FilterControls } from '../../../../../providers/Filter/components/Filter/types';
import { getClusterSettings } from '../../../../../utils/getClusterSettings';
import { codebaseListFilterControlNames } from '../../../constants';
import { usePageFilterContext } from '../../../hooks/usePageFilterContext';
import { ComponentListFilterAllControlNames } from '../../../types';

type FilterControlsType = FilterControls<ComponentListFilterAllControlNames>;

export const useFilter = (): {
  controls: FilterControlsType;
  filterFunction: (...args: CodebaseKubeObjectInterface[]) => boolean;
} => {
  const { filterFunction, setFilterItem } = usePageFilterContext();

  const controls = React.useMemo(
    () => ({
      search: {
        component: <SearchControl />,
      },
      ...((getClusterSettings()?.allowedNamespaces || []).length > 1
        ? {
            namespace: {
              component: <NamespaceControl />,
            },
          }
        : {}),
      codebaseType: {
        component: (
          <FormControl fullWidth>
            <InputLabel shrink id="codebase-type">
              Codebase Type
            </InputLabel>
            <Select
              labelId="codebase-type"
              onChange={(e) =>
                setFilterItem(
                  codebaseListFilterControlNames.CODEBASE_TYPE,
                  e.target.value as CODEBASE_TYPES
                )
              }
              defaultValue={CODEBASE_TYPES.ALL}
              fullWidth
            >
              {codebaseTypeSelectOptions.map(({ label, value, disabled = false }, idx) => {
                const key = `${label}::${idx}`;

                return (
                  <MenuItem value={value} key={key} disabled={disabled}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ),
      },
    }),
    [setFilterItem]
  );

  return { controls, filterFunction };
};
