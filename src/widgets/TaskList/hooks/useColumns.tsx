import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { TableColumn } from '../../../components/Table/types';
import { TextWithTooltip } from '../../../components/TextWithTooltip';
import { TaskKubeObjectInterface } from '../../../k8s/groups/Tekton/Task/types';
import { routeTaskDetails } from '../../../pages/configuration/pages/task-details/route';

export const useColumns = (): TableColumn<TaskKubeObjectInterface>[] => {
  return React.useMemo(
    () => [
      {
        id: 'name',
        label: 'Name',
        columnSortableValuePath: 'metadata.name',
        render: ({ metadata: { name, namespace } }) => (
          <Link
            routeName={routeTaskDetails.path}
            params={{
              name,
              namespace,
            }}
          >
            <TextWithTooltip text={name} />
          </Link>
        ),
        width: '25%',
      },
      {
        id: 'description',
        label: 'Description',
        render: ({ spec }) => <TextWithTooltip text={spec?.description} maxLineAmount={3} />,
        width: '50%',
      },
      {
        id: 'createdAt',
        label: 'Created At',
        customSortFn: (a, b) => {
          const aStartTime = a?.status?.startTime;
          const bStartTime = b?.status?.startTime;

          const aStartTimeDate = new Date(aStartTime).getTime();
          const bStartTimeDate = new Date(bStartTime).getTime();

          if (aStartTimeDate < bStartTimeDate) {
            return -1;
          } else if (aStartTimeDate > bStartTimeDate) {
            return 1;
          }

          return 0;
        },
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
