import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { useFilterContext } from '../../../providers/Filter/hooks';
import { PageFilterExtraControls } from '../types';

export const usePageFilterContext = () => {
  return useFilterContext<EDPCodebaseKubeObjectInterface, PageFilterExtraControls>();
};
