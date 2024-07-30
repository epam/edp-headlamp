import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../../components/ConditionalWrapper';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { CodebaseKubeObject } from '../../../../../k8s/groups/EDP/Codebase';
import { EnrichedApplicationWithItsImageStreams } from '../../../../../k8s/groups/EDP/Codebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { rem } from '../../../../../utils/styling/rem';
import { routeComponentDetails } from '../../../../component-details/route';

export const useColumns = (): TableColumn<EnrichedApplicationWithItsImageStreams>[] =>
  React.useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        render: ({ application }) => {
          const status = application?.status?.status;
          const detailedMessage = application?.status?.detailedMessage;
          const type = application?.spec?.type;

          const [icon, color, isRotating] = CodebaseKubeObject.getStatusIcon(status);

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

          return (
            <ConditionalWrapper
              condition={type === CODEBASE_TYPES.SYSTEM}
              wrapper={(children) => (
                <Grid container spacing={2} alignItems={'center'} style={{ margin: 0 }}>
                  {children}
                  <Grid item>
                    <Tooltip title={'System codebase'}>
                      <Icon
                        icon={ICONS.SCREWDRIVER}
                        width={25}
                        style={{
                          display: 'block',
                        }}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
              )}
            >
              <StatusIcon icon={icon} isRotating={isRotating} color={color} Title={title} />
            </ConditionalWrapper>
          );
        },
        width: '10%',
      },
      {
        id: 'application',
        label: 'Application',
        render: ({
          application: {
            metadata: { name, namespace },
          },
        }) => {
          return (
            <Link
              routeName={routeComponentDetails.path}
              params={{
                name,
                namespace,
              }}
            >
              {name}
            </Link>
          );
        },
        width: '40%',
      },
      {
        id: 'imageStream',
        label: 'Image stream',
        render: ({ applicationImageStream }) => applicationImageStream?.metadata?.name,
        width: '40%',
      },
      {
        id: 'toPromote',
        label: 'To promote',
        render: ({ toPromote }) => (
          <Icon icon={toPromote ? ICONS.ACCEPT_ARROW : ICONS.CROSS} width="20" />
        ),
        textAlign: 'center',
      },
    ],
    []
  );
