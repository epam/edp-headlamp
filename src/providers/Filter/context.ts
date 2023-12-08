import React from 'react';
import { FilterContextProviderValue } from './types';

export const FilterContext = React.createContext<FilterContextProviderValue<any>>({
    filter: {
        values: {},
        matchFunctions: {},
    },
    setFilter: () => {},
    filterFunction: null,
});
