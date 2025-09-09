import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { LOCAL_STORAGE_SERVICE } from '../../services/local-storage';
import { useAddQuery } from './components/Filter/hooks/useAddQuery';
import { namespaceFunction, searchFunction } from './constants';
import { FilterContext } from './context';
import { DefaultControlNames, FilterContextProviderProps, FilterState } from './types';

const LS_FILTER_KEY = 'FILTER_STATE';

type DefaultFilterState = FilterState<KubeObjectInterface, DefaultControlNames>;

const defaultInitialFilterState: DefaultFilterState = {
  values: {
    search: '',
    namespace: '',
  },
  matchFunctions: {
    search: searchFunction,
    namespace: namespaceFunction,
  },
};

export const FilterContextProvider = <
  Item extends unknown,
  ControlNames extends DefaultControlNames
>({
  children,
  entityID,
  matchFunctions,
  saveToLocalStorage = false,
}: FilterContextProviderProps<Item, ControlNames>) => {
  const LS_FILTER_ENTITY_KEY = `${LS_FILTER_KEY}_${entityID}`;
  const lsFilterState = LOCAL_STORAGE_SERVICE.getItem(LS_FILTER_ENTITY_KEY);

  const addQuery = useAddQuery();

  const [filter, setFilter] = React.useState<FilterState<Item, ControlNames>>(() => {
    if (saveToLocalStorage && lsFilterState) {
      return {
        ...lsFilterState,
        matchFunctions: {
          ...defaultInitialFilterState.matchFunctions,
          ...matchFunctions,
        },
      };
    }

    return {
      ...defaultInitialFilterState,
      matchFunctions: {
        ...defaultInitialFilterState.matchFunctions,
        ...matchFunctions,
      },
    };
  });

  const [showFilter, setShowFilter] = React.useState<boolean>(lsFilterState ?? false);

  const filterFunction = React.useCallback(
    (item: Item) => {
      let matches = true;

      for (const [key, filterFn] of Object.entries(filter.matchFunctions)) {
        const keyControlValue = filter.values[key as ControlNames];

        matches = keyControlValue ? filterFn(item, keyControlValue) : true;

        if (!matches) {
          break;
        }
      }

      return matches;
    },
    [filter]
  );

  const setFilterItem = React.useCallback(
    (key: string, value: any) => {
      setFilter((prev) => {
        const newFilters = {
          ...prev,
          values: {
            ...prev.values,
            [key]: value,
          },
        };

        if (saveToLocalStorage) {
          LOCAL_STORAGE_SERVICE.setItem(LS_FILTER_ENTITY_KEY, {
            // setting only values to local storage
            values: newFilters.values,
          });
        }

        return newFilters;
      });
    },
    [LS_FILTER_ENTITY_KEY, saveToLocalStorage]
  );

  const resetFilter = React.useCallback(() => {
    setFilter({
      ...defaultInitialFilterState,
      matchFunctions: {
        ...defaultInitialFilterState.matchFunctions,
        ...matchFunctions,
      },
    } as FilterState<Item, ControlNames>);

    if (saveToLocalStorage) {
      LOCAL_STORAGE_SERVICE.removeItem(LS_FILTER_ENTITY_KEY);
    }

    const newQueryParams = Object.entries(filter.values).reduce(
      (acc: { [key: string]: string }, [key]) => {
        acc[key] = '';
        return acc;
      },
      {}
    );

    addQuery({ ...newQueryParams }, { ...newQueryParams });
  }, [LS_FILTER_ENTITY_KEY, addQuery, filter.values, saveToLocalStorage, matchFunctions]);

  return (
    <FilterContext.Provider
      value={{ showFilter, filter, setFilterItem, setShowFilter, resetFilter, filterFunction }}
    >
      {children}
    </FilterContext.Provider>
  );
};
