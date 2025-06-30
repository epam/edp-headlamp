import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Table } from '../../../../../../components/Table';
import { useEDPConfigMapQuery } from '../../../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { ApiServiceBase, OpensearchApiService } from '../../../../../../services/api';
import { getToken } from '../../../../../../utils/getToken';
import { getLogsQuery } from '../../logs.query';
import { NormalizedLogs, OpensearchResponse, PipelineDetailsRouteParams } from '../../types';
import { normalizeLogs } from '../../utils';
import { useColumns } from './hooks/useColumns';

export const History = () => {
  const { namespace, name } = useParams<PipelineDetailsRouteParams>();
  const columns = useColumns();
  const { data: EDPConfigMap } = useEDPConfigMapQuery();

  const cluster = Utils.getCluster() || '';
  const token = getToken(cluster);
  const apiGatewayUrl = EDPConfigMap?.data?.api_gateway_url;

  const apiService = new ApiServiceBase(apiGatewayUrl, token);

  const opensearchApiService = new OpensearchApiService(apiService);

  const query = useQuery<OpensearchResponse, unknown, NormalizedLogs>(
    ['openSearchLogsAll', namespace],
    () =>
      apiService.createFetcher(
        opensearchApiService.getLogsEndpoint(),
        JSON.stringify(getLogsQuery(namespace, name)),
        'POST'
      ),
    {
      enabled: !!apiService.apiBaseURL,
      select: (data) => normalizeLogs(data),
    }
  );

  return (
    <Table
      id={'pipeline-run-history-of-pipeline'}
      isLoading={query.isLoading}
      data={query.data! || []}
      blockerError={query.error as ApiError}
      columns={columns}
      settings={{
        show: false,
      }}
    />
  );
};
