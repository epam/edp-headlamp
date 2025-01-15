import React from 'react';
import { FilterContext } from './context';
import { FilterContextProviderValue } from './types';

export const useFilterContext = <Item, ControlNames extends string>() =>
  React.useContext<FilterContextProviderValue<Item, ControlNames>>(FilterContext);
