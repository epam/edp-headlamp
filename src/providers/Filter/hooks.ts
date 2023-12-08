import React from 'react';
import { FilterContext } from './context';
import { DefaultControlKeys, FilterContextProviderValue } from './types';

export const useFilterContext = <ExtraControlsKeys extends string = DefaultControlKeys>() =>
    React.useContext<FilterContextProviderValue<ExtraControlsKeys>>(FilterContext);
