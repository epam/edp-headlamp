import React from 'react';
import { useQueries } from 'react-query';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { Action } from '../../types/permissions';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { PermissionsContext } from './context';
import { PermissionConfig, PermissionsProviderProps } from './types';

const fetchPermission = async (action: Action, configItem: PermissionConfig) => {
  const { instance: Instance, config } = configItem;
  const apiVersion = `${config.group}/${config.version}`;
  const kubeObject = new Instance({
    apiVersion,
    kind: config.kind,
    // @ts-ignore
    metadata: {
      namespace: getDefaultNamespace(),
    },
  });
  const result = await kubeObject.getAuthorization(action);
  return {
    action,
    kind: config.kind,
    allowed: result.status.allowed,
  };
};

export const PermissionsContextProvider = <T extends Record<string, PermissionConfig[]>>({
  children,
  permissionConfigs,
}: PermissionsProviderProps<T>) => {
  const queryResults = useQueries(
    Object.entries(permissionConfigs).flatMap(([action, configs]) =>
      configs.map((configItem) => ({
        queryKey: ['permissions', action, configItem.config.kind],
        queryFn: () => fetchPermission(action as Action, configItem),
        staleTime: 60000, // 1 minute cache time
      }))
    )
  );

  const permissions = queryResults.reduce((acc, result) => {
    if (result.isSuccess && result.data) {
      const { action, kind, allowed } = result.data;
      if (!acc[action]) acc[action] = {};
      acc[action][kind] = {
        allowed,
      };

      if (!allowed) {
        acc[action][kind].reason = `You do not have permission to ${action.toLowerCase()} ${kind}`;
      }
    }
    return acc;
  }, {});

  const isFetching = queryResults.some((result) => result.isLoading);

  return (
    <PermissionsContext.Provider value={permissions}>
      <LoadingWrapper isLoading={isFetching}>{children}</LoadingWrapper>
    </PermissionsContext.Provider>
  );
};
