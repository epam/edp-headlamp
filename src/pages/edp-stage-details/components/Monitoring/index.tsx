import React from 'react';
import { LinkCreationService } from '../../../../services/link-creation';

export const Monitoring = ({
  grafanaBaseUrl,
  namespace,
}: {
  grafanaBaseUrl: string;
  namespace: string;
}) => {
  return (
    <iframe
      title="monitoring"
      frameBorder="0"
      height="500"
      width="100%"
      src={LinkCreationService.grafana.createDashboardLink(grafanaBaseUrl, namespace)}
    ></iframe>
  );
};
