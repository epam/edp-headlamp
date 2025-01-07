import React from 'react';
import { LinkCreationService } from '../../../../services/link-creation';

export const Monitoring = ({
  provider,
  baseUrl,
  namespace,
}: {
  provider: string;
  baseUrl: string;
  namespace: string;
}) => {
  return (
    <iframe
      title="monitoring"
      frameBorder="0"
      height="800"
      width="100%"
      src={LinkCreationService.monitoring.createDashboardLink({
        provider,
        baseURL: baseUrl,
        namespace,
      })}
    ></iframe>
  );
};
