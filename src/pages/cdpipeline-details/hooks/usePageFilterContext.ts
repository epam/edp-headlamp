import { useFilterContext } from '../../../providers/Filter/hooks';
import { StageWithApplicationsData } from '../providers/DynamicData/types';
import { PageFilterExtraControls } from '../types';

export const usePageFilterContext = () => {
  return useFilterContext<StageWithApplicationsData, PageFilterExtraControls>();
};
