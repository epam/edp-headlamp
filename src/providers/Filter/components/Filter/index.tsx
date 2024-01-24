import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { DEFAULT_CONTROLS } from '../../constants';
import { DefaultControlKeys, FilterProps } from '../../types';
import { NamespaceControl } from './components/NamespaceControl';
import { SearchControl } from './components/SearchControl';
import { useAddQuery } from './hooks/useAddQuery';
import { getFilterValueByNameFromURL } from './utilts';

export const Filter = <ControlKeys extends string = DefaultControlKeys>({
  controls,
  filter,
  setFilter,
}: FilterProps<ControlKeys>) => {
  const addQuery = useAddQuery();

  const [showFilters, setShowFilters] = React.useState<boolean>();

  const controlsRenderer = React.useCallback(() => {
    return Object.entries(controls).map(([controlKey, controlValue]) => {
      switch (controlKey) {
        case DEFAULT_CONTROLS.NAMESPACE:
          return (
            <Grid item>
              <NamespaceControl filter={filter} setFilter={setFilter} />
            </Grid>
          );
        case DEFAULT_CONTROLS.SEARCH:
          return (
            <Grid item>
              <SearchControl filter={filter} setFilter={setFilter} />
            </Grid>
          );
        default:
          return <Grid item>{controlValue}</Grid>;
      }
    });
  }, [controls, filter, setFilter]);

  useHotkeys('ctrl+shift+f', () => {
    if (controls.search || controls.namespace) {
      setShowFilters(true);
    }
  });

  const resetFilters = () => {
    addQuery({ namespace: '', search: '' }, { namespace: '', search: '' });
    setShowFilters(false);
    setFilter({
      values: {},
      matchFunctions: {},
    });
  };

  React.useEffect(
    () => {
      const namespace = getFilterValueByNameFromURL('namespace', location);
      const stateNamespaces = (filter.values.namespace as string[]) || new Set<string>();

      if (namespace.length > 0) {
        const namespaceFromStore = [...stateNamespaces].sort();
        if (
          namespace
            .slice()
            .sort()
            .every((value: string, index: number) => value !== namespaceFromStore[index])
        ) {
          setFilter((prev) => ({
            ...prev,
            values: {
              ...prev.values,
              namespace: namespace,
            },
            matchFunctions: {
              ...prev.matchFunctions,
              namespace: (item) => namespace.includes(item.metadata.namespace),
            },
          }));

          if (controls.namespace) {
            setShowFilters(true);
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Grid container spacing={2} alignItems={'flex-end'}>
      {showFilters ? (
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
              onClick={() => setShowFilters(true)}
              size="large"
            >
              <Icon icon="mdi:filter-variant" />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};
