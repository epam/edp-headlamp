import React from 'react';
import { ValueOf } from '../../types/global';
import { DEFAULT_CONTROLS } from './constants';

export type DefaultControlNames = ValueOf<typeof DEFAULT_CONTROLS>;

export type ControlName<ControlNames> = DefaultControlNames | ControlNames;

export type ControlValue = boolean | ControlComponent;

export type FilterState<Item, ControlNames extends string> = {
  values: Record<ControlName<ControlNames>, string | string[] | boolean>;
  matchFunctions: Record<ControlName<ControlNames>, (item: Item, value: any) => boolean>;
};

export interface FilterContextProviderValue<Item, ControlNames extends string> {
  showFilter: boolean;
  filter: FilterState<Item, ControlNames>;
  setFilterItem: (key: ControlNames, value: any) => void;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  resetFilter: () => void;
  filterFunction: (item: Item) => boolean;
}

export interface FilterContextProviderProps<Item, ControlNames extends string> {
  children: React.ReactNode;
  entityID: string;
  matchFunctions: {
    [key in ControlNames]?: (item: Item, value: any) => boolean;
  };
  saveToLocalStorage?: boolean;
}

export interface ControlComponent {
  component: React.ReactElement;
  gridXs?: number;
}
