import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { ResponsiveChips } from '../../../../../components/ResponsiveChips';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { TextWithTooltip } from '../../../../../components/TextWithTooltip';
import { MAIN_COLOR } from '../../../../../constants/colors';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { CDPipelineKubeObject } from '../../../../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectInterface } from '../../../../../k8s/groups/EDP/CDPipeline/types';
import { HeadlampKubeObject } from '../../../../../types/k8s';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { rem } from '../../../../../utils/styling/rem';
import { routeCDPipelineDetails } from '../../../../cdpipeline-details/route';
import { routeComponentDetails } from '../../../../component-details/route';
import { useTypedPermissions } from '../../../hooks/useTypedPermissions';
import { Actions } from '../../Actions';

export const useColumns = (): TableColumn<HeadlampKubeObject<CDPipelineKubeObjectInterface>>[] => {
  const permissions = useTypedPermissions();

  return React.useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        columnSortableValuePath: 'status.status',
        render: (CDPipeline) => {
          const status = CDPipeline?.status?.status;
          const detailedMessage = CDPipeline?.status?.detailed_message;

          const [icon, color, isRotating] = CDPipelineKubeObject.getStatusIcon(status);

          const title = (
            <>
              <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                {`Status: ${status || 'Unknown'}`}
              </Typography>
              {status === CUSTOM_RESOURCE_STATUSES.FAILED && (
                <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                  {detailedMessage}
                </Typography>
              )}
            </>
          );

          return <StatusIcon icon={icon} color={color} isRotating={isRotating} Title={title} />;
        },
        width: '5%',
      },
      {
        id: 'cdPipeline',
        label: 'Deployment Flow',
        columnSortableValuePath: 'metadata.name',
        render: ({ metadata: { name, namespace } }) => {
          return (
            <Link
              routeName={routeCDPipelineDetails.path}
              params={{
                name,
                namespace,
              }}
            >
              <TextWithTooltip text={name} />
            </Link>
          );
        },
        sort: (a, b) => sortByName(a.metadata.name, b.metadata.name),
        width: '15%',
      },
      {
        id: 'description',
        label: 'Description',
        render: ({ spec }) => <TextWithTooltip text={spec?.description} maxLineAmount={3} />,
        width: '30%',
      },
      {
        id: 'applications',
        label: 'Applications',
        render: ({ spec: { applications }, metadata: { namespace } }) => {
          return (
            <ResponsiveChips
              chipsData={applications}
              renderChip={(label, key) => {
                return (
                  <Chip
                    key={key}
                    sx={{
                      backgroundColor: MAIN_COLOR.GREEN,
                      borderColor: 'transparent',
                    }}
                    size="small"
                    label={
                      <Link
                        routeName={routeComponentDetails.path}
                        params={{
                          name: label,
                          namespace,
                        }}
                        style={{ color: 'white' }}
                      >
                        {label}
                      </Link>
                    }
                  />
                );
              }}
              renderTooltip={(chipsToHide) => {
                return (
                  <Box
                    sx={{ py: (t) => t.typography.pxToRem(6), px: (t) => t.typography.pxToRem(10) }}
                  >
                    <Stack spacing={1.5} flexWrap="wrap" sx={{ fontWeight: 400 }}>
                      {chipsToHide.map((label) => (
                        <Chip
                          key={label}
                          sx={{
                            backgroundColor: MAIN_COLOR.GREEN,
                            borderColor: 'transparent',
                          }}
                          size="small"
                          label={
                            <Link
                              routeName={routeComponentDetails.path}
                              params={{
                                name: label,
                                namespace,
                              }}
                              style={{ color: 'white' }}
                            >
                              {label}
                            </Link>
                          }
                        />
                      ))}
                    </Stack>
                  </Box>
                );
              }}
            />
          );
        },
        width: '45%',
      },
      {
        id: 'actions',
        label: 'Actions',
        render: (resource) => <Actions resource={resource?.jsonData} permissions={permissions} />,
      },
    ],
    [permissions]
  );
};
