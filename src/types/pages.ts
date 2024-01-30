export interface PageDescription {
  label: string;
  description: string;
  routePath: string;
  docLink?: string;
}

export interface DataProviderValue<T> {
  data: T;
  error: unknown;
  isLoading: boolean;
}
