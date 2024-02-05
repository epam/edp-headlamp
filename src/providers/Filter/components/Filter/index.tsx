import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useFilterContext } from '../../hooks';
import { ControlComponent, DefaultControlKeys } from '../../types';
import { FilterProps } from './types';

export const Filter = <ControlsKeys extends string = DefaultControlKeys>({
  controls,
  hideFilter = true,
}: FilterProps<ControlsKeys>) => {
  const { showFilter, setShowFilter, resetFilter } = useFilterContext<unknown, ControlsKeys>();

  const controlsRenderer = React.useCallback(() => {
    return Object.entries(controls).map(([, controlValue]) => {
      const { component, gridXs = 2 } = controlValue as ControlComponent;

      return (
        <Grid item xs={gridXs}>
          {component}
        </Grid>
      );
    });
  }, [controls]);

  const resetFilters = () => {
    setShowFilter(false);
    resetFilter();
  };

  return (
    <Grid container spacing={2} alignItems={'flex-end'} justifyContent="flex-end" wrap="nowrap">
      {hideFilter ? (
        <>
          {showFilter ? (
            <>
              {controlsRenderer()}
              <Grid item>
                <Tooltip title={'Reset Filter'}>
                  <Button
                    variant="contained"
                    endIcon={<Icon icon="mdi:filter-variant-remove" />}
                    onClick={resetFilters}
                    aria-controls="standard-search"
                  >
                    Clear
                  </Button>
                </Tooltip>
              </Grid>
            </>
          ) : (
            <Grid item>
              <Tooltip title={'Enable Filtering'}>
                <IconButton
                  aria-label={'Show Filters'}
                  onClick={() => setShowFilter(true)}
                  size="large"
                >
                  <Icon icon="mdi:filter-variant" />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </>
      ) : (
        controlsRenderer()
      )}
    </Grid>
  );
};
