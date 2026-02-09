import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useEDPConfigMapQuery } from '../../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { ApiServiceBase, GitFusionApiService } from '../../../../../services/api';
import { getToken } from '../../../../../utils/getToken';
import { CurrentDialogContext } from './context';
import { CurrentDialogContextProviderProps } from './types';

export const CurrentDialogContextProvider: React.FC<CurrentDialogContextProviderProps> = ({
  children,
  props,
  state,
}) => {
  const cluster = Utils.getCluster() || '';
  const token = getToken(cluster);
  const { data: EDPConfigMap } = useEDPConfigMapQuery();

  const apiGatewayUrl = EDPConfigMap?.data?.api_gateway_url;

  const CurrentDialogContextValue = React.useMemo(() => {
    const apiServiceBase = new ApiServiceBase(apiGatewayUrl, token);

    const gitFusionApiService = new GitFusionApiService(apiServiceBase);

    return {
      props,
      state,
      apiServiceBase,
      gitFusionApiService,
    };
  }, [apiGatewayUrl, props, state, token]);

  return (
    <CurrentDialogContext.Provider value={CurrentDialogContextValue}>
      {children}
    </CurrentDialogContext.Provider>
  );
};
