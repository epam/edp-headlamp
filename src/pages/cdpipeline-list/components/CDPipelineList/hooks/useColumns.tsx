import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { ResponsiveChips } from '../../../../../components/ResponsiveChips';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { useTableSettings } from '../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSyncedColumnData } from '../../../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../../../components/Table/types';
import { TextWithTooltip } from '../../../../../components/TextWithTooltip';
import { MAIN_COLOR } from '../../../../../constants/colors';
import { CUSTOM_RESOURCE_STATUS } from '../../../../../constants/statuses';
import { TABLE } from '../../../../../constants/tables';
import { CDPipelineKubeObject } from '../../../../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectInterface } from '../../../../../k8s/groups/EDP/CDPipeline/types';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { rem } from '../../../../../utils/styling/rem';
import { routeCDPipelineDetails } from '../../../../cdpipeline-details/route';
import { routeComponentDetails } from '../../../../component-details/route';
import { useTypedPermissions } from '../../../hooks/useTypedPermissions';
import { Actions } from '../../Actions';
import { columnNames } from '../constants';

export const useColumns = () => {
  const permissions = useTypedPermissions();

  const { loadSettings } = useTableSettings(TABLE.CDPIPELINE_LIST.id);
  const tableSettings = loadSettings();

  return React.useMemo(
    () =>
      [
        {
          id: columnNames.STATUS,
          label: 'Status',
          data: {
            columnSortableValuePath: 'status.status',
            render: ({ data }) => {
              const status = data?.status?.status;
              const detailedMessage = data?.status?.detailed_message;

              const [icon, color, isRotating] = CDPipelineKubeObject.getStatusIcon(status);

              const title = (
                <>
                  <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                    {`Status: ${status || 'Unknown'}`}
                  </Typography>
                  {status === CUSTOM_RESOURCE_STATUS.FAILED && (
                    <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                      {detailedMessage}
                    </Typography>
                  )}
                </>
              );

              return <StatusIcon icon={icon} color={color} isRotating={isRotating} Title={title} />;
            },
          },
          cell: {
            isFixed: true,
            ...getSyncedColumnData(tableSettings, columnNames.STATUS, 5),
          },
        },
        {
          id: columnNames.NAME,
          label: 'Deployment Flow',
          data: {
            columnSortableValuePath: 'metadata.name',
            render: ({
              data: {
                metadata: { name, namespace },
              },
            }) => {
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
            customSortFn: (a, b) => sortByName(a.metadata.name, b.metadata.name),
          },
          cell: {
            customizable: false,
            ...getSyncedColumnData(tableSettings, columnNames.NAME, 15),
          },
        },
        {
          id: columnNames.DESCRIPTION,
          label: 'Description',
          data: {
            render: ({ data: { spec } }) =>
              spec?.description && <TextWithTooltip text={spec.description} maxLineAmount={3} />,
          },
          cell: {
            ...getSyncedColumnData(tableSettings, columnNames.DESCRIPTION, 30),
          },
        },
        {
          id: columnNames.APPLICATIONS,
          label: 'Applications',
          data: {
            render: ({
              data: {
                spec: { applications },
                metadata: { namespace },
              },
            }) => {
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
                        sx={{
                          py: (t) => t.typography.pxToRem(6),
                          px: (t) => t.typography.pxToRem(10),
                        }}
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
          },
          cell: {
            ...getSyncedColumnData(tableSettings, columnNames.APPLICATIONS, 45),
          },
        },
        {
          id: columnNames.ACTIONS,
          label: 'Actions',
          data: {
            render: ({ data }) => (
              //@ts-ignore
              <Actions resource={data?.jsonData ?? data} permissions={permissions} />
            ),
          },
          cell: {
            customizable: false,
            isFixed: true,
            ...getSyncedColumnData(tableSettings, columnNames.ACTIONS, 5),
          },
        },
      ] as TableColumn<CDPipelineKubeObjectInterface>[],
    [permissions, tableSettings]
  );
};
