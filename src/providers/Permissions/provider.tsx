import React from 'react';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { PermissionsContext } from './context';
import { PermissionConfig, PermissionsConfig, PermissionsProviderProps } from './types';

const initializePermissionsState = <T extends Record<string, PermissionConfig[]>>(
  configs: T
): PermissionsConfig<T> => {
  const initialState: PermissionsConfig<T> = {} as PermissionsConfig<T>;
  Object.keys(configs).forEach((action) => {
    initialState[action as keyof T] = {} as any;
    configs[action].forEach((configItem) => {
      initialState[action][configItem.config.kind] = false;
    });
  });
  return initialState;
};

export const PermissionsContextProvider = <T extends Record<string, PermissionConfig[]>>({
  children,
  permissionConfigs,
}: PermissionsProviderProps<T>) => {
  const [permissions, setPermissions] = React.useState<PermissionsConfig<T>>(
    initializePermissionsState(permissionConfigs)
  );

  React.useEffect(() => {
    async function fetchPermissions() {
      const resultMap: PermissionsConfig<T> = initializePermissionsState(permissionConfigs);

      for (const action in permissionConfigs) {
        resultMap[action] = {} as any;

        for (const configItem of permissionConfigs[action]) {
          const { instance: Instance, config } = configItem;
          const apiVersion = `${config.group}/${config.version}`;
          const kubeObject = new Instance({
            apiVersion: apiVersion,
            kind: config.kind,
            // @ts-ignore
            metadata: {
              namespace: getDefaultNamespace(),
            },
          });

          const result = await kubeObject.getAuthorization(action);
          resultMap[action][config.kind] = result.status.allowed;
        }
      }

      setPermissions(resultMap);
    }

    fetchPermissions();
  }, [permissionConfigs]);

  return <PermissionsContext.Provider value={permissions}>{children}</PermissionsContext.Provider>;
};
