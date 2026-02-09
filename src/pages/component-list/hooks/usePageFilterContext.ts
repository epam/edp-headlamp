import { CodebaseKubeObjectInterface } from '../../../k8s/groups/EDP/Codebase/types';
import { useFilterContext } from '../../../providers/Filter/hooks';
import { ComponentListFilterAllControlNames } from '../types';

export const usePageFilterContext = () => {
  return useFilterContext<CodebaseKubeObjectInterface, ComponentListFilterAllControlNames>();
};
