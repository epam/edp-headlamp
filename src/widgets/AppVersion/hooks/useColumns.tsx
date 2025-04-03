import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Tooltip } from '@mui/material';
import React from 'react';
import { TableColumn } from '../../../components/Table/types';
import { TextWithTooltip } from '../../../components/TextWithTooltip';
import {
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../k8s/groups/ArgoCD/Application/types';
import { routeCDPipelineDetails } from '../../../pages/cdpipeline-details/route';
import { routeStageDetails } from '../../../pages/stage-details/route';

export const useColumns = (): TableColumn<ApplicationKubeObjectInterface>[] => {
  return React.useMemo(
    () => [
      {
        id: 'deploymentFlow',
        label: (
          <>
            <Tooltip title="The Deployment Flow used to deploy this version.">
              <div>Deployment Flow</div>
            </Tooltip>
          </>
        ),
        data: {
          render: ({ data: { metadata } }) => {
            const CDPipelineName = metadata?.labels?.[APPLICATION_LABEL_SELECTOR_PIPELINE];

            return (
              <Link
                routeName={routeCDPipelineDetails.path}
                params={{
                  name: CDPipelineName,
                  namespace: metadata.namespace,
                }}
              >
                <TextWithTooltip text={CDPipelineName || ''} />
              </Link>
            );
          },
        },
        cell: {
          customizable: false,
          width: 30,
          baseWidth: 30,
          isFixed: true,
        },
      },
      {
        id: 'environment',
        label: (
          <>
            <Tooltip title="The environment where this version is deployed.">
              <div>Environment</div>
            </Tooltip>
          </>
        ),
        data: {
          render: ({ data: { metadata } }) => {
            const CDPipelineName = metadata?.labels?.[APPLICATION_LABEL_SELECTOR_PIPELINE];
            const stageName = metadata?.labels?.[APPLICATION_LABEL_SELECTOR_STAGE];

            return (
              <Link
                routeName={routeStageDetails.path}
                params={{
                  CDPipelineName,
                  stageName: `${CDPipelineName}-${stageName}`,
                  namespace: metadata.namespace,
                }}
              >
                <TextWithTooltip text={stageName || ''} />
              </Link>
            );
          },
        },
        cell: {
          customizable: false,
          width: 25,
          baseWidth: 25,
          isFixed: true,
        },
      },
      {
        id: 'version',
        label: 'Deployed Version',
        data: {
          render: ({ data }) => {
            if (data?.spec.source?.targetRevision === 'build/NaN') {
              return (
                <Box flexGrow={1}>
                  <Tooltip title="No deployment." followCursor>
                    <div>—</div>
                  </Tooltip>
                </Box>
              );
            }

            return <TextWithTooltip text={data?.spec.source?.targetRevision ?? 'Unknown'} />;
          },
        },
        cell: {
          customizable: false,
          width: 45,
          baseWidth: 45,
          isFixed: true,
        },
      },
    ],
    []
  );
};
