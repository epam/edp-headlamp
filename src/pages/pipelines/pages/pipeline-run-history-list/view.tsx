import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useQuery } from 'react-query';
import { Table } from '../../../../components/Table';
import { useEDPConfigMapQuery } from '../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { ApiServiceBase, OpensearchApiService } from '../../../../services/api';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PipelinesPageWrapper } from '../../components';
import { useColumns } from './hooks/useColumns';
import { getLogsAllQuery } from './logs.query';
import { NormalizedLogs, OpensearchResponse } from './types';
import { normalizeLogs } from './utils';

function getToken(cluster: string) {
  return JSON.parse(localStorage.tokens || '{}')?.[cluster];
}

export const PageView = () => {
  const columns = useColumns();
  const { data: EDPConfigMap } = useEDPConfigMapQuery();

  const cluster = Utils.getCluster() || '';
  const token = getToken(cluster);
  const apiGatewayUrl = EDPConfigMap?.data?.api_gateway_url;

  const apiService = new ApiServiceBase(apiGatewayUrl, token);

  const opensearchApiService = new OpensearchApiService(apiService);

  const query = useQuery<OpensearchResponse, unknown, NormalizedLogs>(
    ['openSearchLogsAll', getDefaultNamespace()],
    () =>
      apiService.createFetcher(
        opensearchApiService.getLogsEndpoint(),
        JSON.stringify(getLogsAllQuery(getDefaultNamespace())),
        'POST'
      ),
    {
      enabled: !!apiService.apiBaseURL,
      select: (data) => normalizeLogs(data),
    }
  );

  return (
    <PipelinesPageWrapper>
      <Table
        id={'pipeline-run-history'}
        isLoading={query.isLoading}
        data={query.data! || []}
        blockerError={query.error as ApiError}
        columns={columns}
        settings={{
          show: false,
        }}
      />
    </PipelinesPageWrapper>
  );
};
