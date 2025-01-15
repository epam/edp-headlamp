import { Icon } from '@iconify/react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { codebaseTypeSelectOptions } from '../../../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../providers/Filter/components/Filter/components/SearchControl';
import { getClusterSettings } from '../../../../utils/getClusterSettings';
import { ManageCodebaseDialog } from '../../../../widgets/dialogs/ManageCodebase';
import { codebaseListFilterControlNames } from '../../constants';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { ComponentListFilterAllControlNames } from '../../types';
import { ComponentListFilterProps } from './types';

export const ComponentListFilter = ({ noGitServers }: ComponentListFilterProps) => {
  const { setFilterItem } = usePageFilterContext();

  const { setDialog } = useDialogContext();

  const permissions = useTypedPermissions();

  return (
    <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
      <Grid item flexGrow={1}>
        <Filter<ComponentListFilterAllControlNames>
          controls={{
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
          }}
        />
      </Grid>
      <Grid item>
        <ButtonWithPermission
          ButtonProps={{
            startIcon: <Icon icon={ICONS.PLUS} />,
            color: 'primary',
            variant: 'contained',
            disabled: noGitServers,
            onClick: () => setDialog(ManageCodebaseDialog, { codebaseData: null }),
          }}
          disabled={!permissions?.create?.Codebase.allowed}
          reason={permissions?.create?.Codebase.reason}
        >
          create component
        </ButtonWithPermission>
      </Grid>
    </Grid>
  );
};
