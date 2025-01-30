import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { useTableSettings } from '../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSavedColumnData } from '../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../components/Table/types';
import { TextWithTooltip } from '../../../components/TextWithTooltip';
import { TABLES } from '../../../constants/tables';
import { TaskKubeObjectInterface } from '../../../k8s/groups/Tekton/Task/types';
import { routeTaskDetails } from '../../../pages/configuration/pages/task-details/route';
import { columnNames } from '../constants';

export const useColumns = (): TableColumn<TaskKubeObjectInterface>[] => {
  const { loadSettings } = useTableSettings(TABLES.TASK_LIST.id);

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
          baseWidth: 25,
          width: getSavedColumnData(tableSettings, columnNames.NAME)?.width ?? 25,
          show: getSavedColumnData(tableSettings, columnNames.NAME)?.show ?? true,
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
          baseWidth: 50,
          width: getSavedColumnData(tableSettings, columnNames.DESCRIPTION)?.width ?? 50,
          show: getSavedColumnData(tableSettings, columnNames.DESCRIPTION)?.show ?? true,
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
          baseWidth: 25,
          width: getSavedColumnData(tableSettings, columnNames.CREATED_AT)?.width ?? 25,
          show: getSavedColumnData(tableSettings, columnNames.CREATED_AT)?.show ?? true,
        },
      },
    ],
    [tableSettings]
  );
};
