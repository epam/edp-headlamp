import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { IconButton } from '@mui/material';
import React from 'react';
import { useTableSettings } from '../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSavedColumnData } from '../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../components/Table/types';
import { TextWithTooltip } from '../../../components/TextWithTooltip';
import { TABLES } from '../../../constants/tables';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineKubeObjectInterface } from '../../../k8s/groups/Tekton/Pipeline/types';
import { routePipelineDetails } from '../../../pages/configuration/pages/pipeline-details/route';
import { useDialogContext } from '../../../providers/Dialog/hooks';
import { PipelineGraphDialog } from '../../dialogs/PipelineGraph';
import { columnNames } from '../constants';

export const useColumns = (): TableColumn<PipelineKubeObjectInterface>[] => {
  const { setDialog } = useDialogContext();
  const { loadSettings } = useTableSettings(TABLES.PIPELINE_LIST.id);

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
              routeName={routePipelineDetails.path}
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
          baseWidth: 20,
          width: getSavedColumnData(tableSettings, columnNames.CREATED_AT)?.width ?? 20,
          show: getSavedColumnData(tableSettings, columnNames.CREATED_AT)?.show ?? true,
        },
      },
      {
        id: columnNames.DIAGRAM,
        label: 'Diagram',
        data: {
          render: ({ data }) => {
            return (
              <IconButton
                onClick={() =>
                  setDialog(PipelineGraphDialog, {
                    pipeline: data,
                  })
                }
                size="medium"
              >
                <Icon icon={ICONS.DIAGRAM} />
              </IconButton>
            );
          },
        },
        cell: {
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.DIAGRAM)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.DIAGRAM)?.show ?? true,
          props: {
            align: 'center',
          },
        },
      },
    ],
    [setDialog, tableSettings]
  );
};
