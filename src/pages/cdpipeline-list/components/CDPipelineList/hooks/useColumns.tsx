import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
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
        width: '10%',
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
              {name}
            </Link>
          );
        },
        sort: (a, b) => sortByName(a.metadata.name, b.metadata.name),
        width: '30%',
      },
      {
        id: 'applications',
        label: 'Applications',
        columnSortableValuePath: 'spec.applications',
        render: ({ spec: { applications }, metadata: { namespace } }) => {
          return (
            <>
              {applications.map((el, idx) => {
                const propertyId = `${el}:${idx}`;

                return (
                  <React.Fragment key={propertyId}>
                    <>
                      {idx !== 0 && <Typography component="span">, </Typography>}
                      <Link
                        routeName={routeComponentDetails.path}
                        params={{
                          name: el,
                          namespace,
                        }}
                      >
                        {el}
                      </Link>
                    </>
                  </React.Fragment>
                );
              })}
            </>
          );
        },
      },
      {
        id: 'actions',
        label: '',
        render: (resource) => <Actions resource={resource?.jsonData} permissions={permissions} />,
      },
    ],
    [permissions]
  );
};
