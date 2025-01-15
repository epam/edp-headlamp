import { useFilterContext } from '../../../providers/Filter/hooks';
import { StageWithApplicationsData } from '../providers/DynamicData/types';
import { StagesFilterAllControlNames } from '../types';

export const usePageFilterContext = () => {
  return useFilterContext<StageWithApplicationsData, StagesFilterAllControlNames>();
};
