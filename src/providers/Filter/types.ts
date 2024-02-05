import React from 'react';
import { ValueOf } from '../../types/global';
import { DEFAULT_CONTROLS } from './constants';

export type DefaultControlKeys = ValueOf<typeof DEFAULT_CONTROLS>;
export interface ControlComponent {
  component: React.ReactElement;
  gridXs?: number;
}
export type ControlKey<ExtraKeys> = DefaultControlKeys | ExtraKeys;
export type ControlValue = boolean | ControlComponent;

export type FilterState<Item, ExtraControlsKeys extends string = DefaultControlKeys> = {
  values: {
    [key in ControlKey<ExtraControlsKeys>]?: string | string[] | boolean | undefined | null;
  };
  matchFunctions: {
    [key in ControlKey<ExtraControlsKeys>]?: (item: Item, value: any) => boolean;
  };
};

export interface FilterContextProviderValue<
  Item,
  ExtraControlsKeys extends string = DefaultControlKeys
> {
  showFilter: boolean;
  filter: FilterState<Item, ExtraControlsKeys>;
  setFilterItem: (key: ExtraControlsKeys, value: any) => void;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  resetFilter: () => void;
  filterFunction: (item: Item) => boolean;
}

export interface FilterContextProviderProps<
  Item,
  ExtraControlsKeys extends string = DefaultControlKeys
> {
  children: React.ReactNode;
  entityID: string;
  matchFunctions: Record<ExtraControlsKeys, (item: Item, value: any) => boolean>;
  saveToLocalStorage?: boolean;
}
