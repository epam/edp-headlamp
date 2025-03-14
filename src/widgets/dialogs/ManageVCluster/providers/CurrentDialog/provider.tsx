import React from 'react';
import { useEDPConfigMapQuery } from '../../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { CurrentDialogContext } from './context';
import { CurrentDialogContextProviderProps } from './types';

export const CurrentDialogContextProvider: React.FC<CurrentDialogContextProviderProps> = ({
  children,
  props,
  state,
}) => {
  const { data: EDPConfigMap } = useEDPConfigMapQuery({});

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
