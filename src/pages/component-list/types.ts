import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { ControlName } from '../../providers/Filter/types';
import { ValueOf } from '../../types/global';
import { codebaseListFilterControlNames } from './constants';

export type ComponentListFilterControlNames = ValueOf<typeof codebaseListFilterControlNames>;

export type ComponentListFilterAllControlNames = ControlName<ComponentListFilterControlNames>;

export type MatchFunctions = {
  [key in ComponentListFilterAllControlNames]?: (
    item: CodebaseKubeObjectInterface,
    value: string | string[]
  ) => boolean;
};
