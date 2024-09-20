import React from 'react';
import { ConfigMapKubeObject } from '../../../../../k8s/groups/default/ConfigMap';
import { EDP_CONFIG_CONFIG_MAP_NAME } from '../../../../../k8s/groups/default/ConfigMap/constants';
import { CurrentDialogContext } from './context';
import { CurrentDialogContextProviderProps } from './types';

export const CurrentDialogContextProvider: React.FC<CurrentDialogContextProviderProps> = ({
  children,
  props,
  state,
}) => {
  const [configMaps] = ConfigMapKubeObject.useList();

  const EDPConfigMap = configMaps?.find(
    (item) => item.metadata.name === EDP_CONFIG_CONFIG_MAP_NAME
  );
  const CurrentDialogContextValue = React.useMemo(
    () => ({
      props,
      state,
      extra: {
        EDPConfigMap,
      },
    }),
    [EDPConfigMap, props, state]
  );

  return (
    <CurrentDialogContext.Provider value={CurrentDialogContextValue}>
      {children}
    </CurrentDialogContext.Provider>
  );
};
