import React from 'react';
import { FilterContext } from './context';
import { DefaultControlKeys, FilterContextProviderValue } from './types';

export const useFilterContext = <Item, ExtraControlsKeys extends string = DefaultControlKeys>() =>
  React.useContext<FilterContextProviderValue<Item, ExtraControlsKeys>>(FilterContext);
