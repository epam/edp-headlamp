import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';

export const getForbiddenError = (error: ApiError): ApiError | null => {
  if (error?.status === 403) {
    return error;
  }
  return null;
};
