import { Icon } from '@iconify/react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { codebaseTypeSelectOptions } from '../../../../configs/select-options/codebaseTypeSelectOptions';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../providers/Filter/components/Filter/components/SearchControl';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../../widgets/CreateEditCodebase/constants';
import { CreateEditCodebaseDialogForwardedProps } from '../../../../widgets/CreateEditCodebase/types';
import { FILTER_CONTROLS } from '../../constants';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { PageFilterExtraControls } from '../../types';
import { ComponentListFilterProps } from './types';

export const ComponentListFilter = ({ noGitServers }: ComponentListFilterProps) => {
  const createEditCodebaseDialogForwardedProps: CreateEditCodebaseDialogForwardedProps =
    React.useMemo(() => ({ mode: FORM_MODES.CREATE }), []);

  const { setFilterItem } = usePageFilterContext();

  const { setDialog } = useDialogContext();

  return (
    <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
      <Grid item flexGrow={1}>
        <Filter<PageFilterExtraControls>
          controls={{
            search: {
              component: <SearchControl />,
            },
            namespace: {
              component: <NamespaceControl />,
            },
            codebaseType: {
              component: (
                <FormControl fullWidth>
                  <InputLabel shrink id="codebase-type">
                    Codebase Type
                  </InputLabel>
                  <Select
                    labelId="codebase-type"
                    onChange={(e) =>
                      setFilterItem(FILTER_CONTROLS.CODEBASE_TYPE, e.target.value as CODEBASE_TYPES)
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
        <Button
          startIcon={<Icon icon={ICONS.PLUS} />}
          color={'primary'}
          variant={'contained'}
          disabled={noGitServers}
          onClick={() =>
            setDialog({
              modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
              forwardedProps: createEditCodebaseDialogForwardedProps,
            })
          }
        >
          create component
        </Button>
      </Grid>
    </Grid>
  );
};
