import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { TemplateKubeObjectInterface } from '../../../../k8s/groups/EDP/Template/types';

export interface DynamicDataContextProviderValue {
  templates: {
    data: TemplateKubeObjectInterface[] | null;
    errors: ApiError[] | null;
    isLoading: boolean;
  };
}
