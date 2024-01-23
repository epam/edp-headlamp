import React from 'react';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { FilterContext } from './context';
import { FilterState } from './types';

export const FilterContextProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState<FilterState>({
    values: {},
    matchFunctions: {},
  });

  const filterFunction = React.useCallback(
    (item: EDPCodebaseKubeObjectInterface) => {
      let matches = true;

      for (const fn of Object.values(filter.matchFunctions)) {
        matches = fn(item);

        if (!matches) {
          break;
        }
      }

      return matches;
    },
    [filter]
  );

  return (
    <FilterContext.Provider value={{ filter, setFilter, filterFunction }}>
      {children}
    </FilterContext.Provider>
  );
};
