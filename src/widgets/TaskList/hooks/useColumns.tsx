import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { TableColumn } from '../../../components/Table/types';
import { TaskKubeObjectInterface } from '../../../k8s/groups/Tekton/Task/types';
import { routeTaskDetails } from '../../../pages/configuration/pages/task-details/route';

export const useColumns = (): TableColumn<TaskKubeObjectInterface>[] => {
  return React.useMemo(
    () => [
      {
        id: 'name',
        label: 'Name',
        render: ({ metadata: { name, namespace } }) => (
          <Link
            routeName={routeTaskDetails.path}
            params={{
              name,
              namespace,
            }}
          >
            {name}
          </Link>
        ),
        width: '75%',
      },
      {
        id: 'createdAt',
        label: 'Created At',
        render: ({ metadata: { creationTimestamp } }) => {
          return new Date(creationTimestamp).toLocaleString('en-mini', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          });
        },
        width: '20%',
      },
    ],
    []
  );
};
