import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';

export interface PageDescription {
  id: string;
  label: string;
  description: string;
  routePath: string;
  docLink?: string;
}

export interface DataProviderValue<T> {
  data: T;
  error: ApiError | null;
  isLoading: boolean;
}

export interface NewDataProviderValue<T> {
  data: T;
  error: ApiError | null;
}
