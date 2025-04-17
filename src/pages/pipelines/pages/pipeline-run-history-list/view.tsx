import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { getToken } from '@kinvolk/headlamp-plugin/lib/lib/auth';
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
        data={query.data!}
        columns={columns}
        settings={{
          show: false,
        }}
      />
    </PipelinesPageWrapper>
  );
};
