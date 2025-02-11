import { Button, Grid, Tooltip } from '@mui/material';
import React from 'react';
import { useFilterContext } from '../../hooks';
import { ControlComponent } from '../../types';
import { FilterProps } from './types';

export const Filter = <ControlNames extends string>({
  controls,
  hideFilter = true,
}: FilterProps<ControlNames>) => {
  const { filter, resetFilter } = useFilterContext<unknown, ControlNames>();

  const controlsRenderer = React.useCallback(() => {
    return Object.entries(controls).map(([controlKey, controlValue]) => {
      const { component, gridXs = 3 } = controlValue as ControlComponent;

      return (
        <Grid item xs={gridXs} key={controlKey}>
          {component}
        </Grid>
      );
    });
  }, [controls]);

  const hasValues = React.useMemo(() => {
    const values = Object.values(filter.values);
    if (values.length === 0) {
      return false;
    }

    return values.some((value) => {
      if (Array.isArray(value)) {
        return !!value.length;
      }
      return !!value;
    });
  }, [filter]);

  const resetFilters = () => {
    resetFilter();
  };

  return (
    <Grid container spacing={2} alignItems={'flex-end'} wrap="nowrap">
      {hideFilter ? (
        <>
          {controlsRenderer()}
          {hasValues ? (
            <Grid item sx={{ mt: '12px' }}>
              <Tooltip title={'Reset Filter'}>
                <Button variant="outlined" onClick={resetFilters}>
                  Clear
                </Button>
              </Tooltip>
            </Grid>
          ) : null}
        </>
      ) : (
        controlsRenderer()
      )}
    </Grid>
  );
};
