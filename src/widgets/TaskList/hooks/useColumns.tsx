import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { useTableSettings } from '../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSyncedColumnData } from '../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../components/Table/types';
import { TextWithTooltip } from '../../../components/TextWithTooltip';
import { TABLE } from '../../../constants/tables';
import { TaskKubeObjectInterface } from '../../../k8s/groups/Tekton/Task/types';
import { routeTaskDetails } from '../../../pages/pipelines/pages/task-details/route';
import { Actions } from '../components/Actions';
import { columnNames } from '../constants';
import { WidgetPermissions } from '../types';

export const useColumns = ({
  permissions,
}: {
  permissions: WidgetPermissions;
}): TableColumn<TaskKubeObjectInterface>[] => {
  const { loadSettings } = useTableSettings(TABLE.TASK_LIST.id);

  const tableSettings = loadSettings();

  return React.useMemo(
    () => [
      {
        id: columnNames.NAME,
        label: 'Name',
        data: {
          columnSortableValuePath: 'metadata.name',
          render: ({
            data: {
              metadata: { name, namespace },
            },
          }) => (
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
        },
        cell: {
          customizable: false,
          ...getSyncedColumnData(tableSettings, columnNames.NAME, 25),
        },
      },
      {
        id: columnNames.DESCRIPTION,
        label: 'Description',
        data: {
          render: ({ data: { spec } }) => (
            <TextWithTooltip text={spec?.description} maxLineAmount={3} />
          ),
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.DESCRIPTION, 50),
        },
      },
      {
        id: columnNames.CREATED_AT,
        label: 'Created At',
        data: {
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
          render: ({
            data: {
              metadata: { creationTimestamp },
            },
          }) => {
            return new Date(creationTimestamp).toLocaleString('en-mini', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            });
          },
        },
        cell: {
          isFixed: true,
          ...getSyncedColumnData(tableSettings, columnNames.CREATED_AT, 25),
        },
      },
      {
        id: columnNames.ACTIONS,
        label: 'Actions',
        data: {
          render: ({ data }) => <Actions resource={data} permissions={permissions} />,
        },
        cell: {
          isFixed: true,
          customizable: false,
          ...getSyncedColumnData(tableSettings, columnNames.ACTIONS, 5),
        },
      },
    ],
    [permissions, tableSettings]
  );
};
