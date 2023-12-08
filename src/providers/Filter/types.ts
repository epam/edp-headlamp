import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';
import { ValueOf } from '../../types/global';
import { DEFAULT_CONTROLS } from './constants';

export type DefaultControlKeys = ValueOf<typeof DEFAULT_CONTROLS>;
type ControlKey<ExtraKeys> = DefaultControlKeys | ExtraKeys;
type ControlComponent = boolean | React.ReactElement;

export type FilterState<ExtraControlsKeys extends string = DefaultControlKeys> = {
    values: {
        [key in ControlKey<ExtraControlsKeys>]?: unknown;
    };
    matchFunctions: {
        [key in ControlKey<ExtraControlsKeys>]?: (item: KubeObjectInterface) => boolean;
    };
};

export interface FilterProps<ExtraControlsKeys extends string = DefaultControlKeys> {
    controls: Record<ControlKey<ExtraControlsKeys>, ControlComponent>;
    filter: FilterState<ExtraControlsKeys>;
    setFilter: React.Dispatch<React.SetStateAction<FilterState<ExtraControlsKeys>>>;
}

export interface FilterContextProviderValue<ExtraControlsKeys extends string = DefaultControlKeys> {
    filter: FilterState<ExtraControlsKeys>;
    setFilter: React.Dispatch<React.SetStateAction<FilterState<ExtraControlsKeys>>>;
    filterFunction: (item: KubeObjectInterface) => boolean;
}
