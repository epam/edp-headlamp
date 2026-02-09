import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { IconButton } from '@mui/material';
import React from 'react';
import { useTableSettings } from '../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSyncedColumnData } from '../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../components/Table/types';
import { TextWithTooltip } from '../../../components/TextWithTooltip';
import { TABLE } from '../../../constants/tables';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineKubeObjectInterface } from '../../../k8s/groups/Tekton/Pipeline/types';
import { TriggerTemplateKubeObjectInterface } from '../../../k8s/groups/Tekton/TriggerTemplate/types';
import { routePipelineDetails } from '../../../pages/pipelines/pages/pipeline-details/route';
import { useDialogContext } from '../../../providers/Dialog/hooks';
import { PipelineGraphDialog } from '../../dialogs/PipelineGraph';
import { Actions } from '../components/Actions';
import { columnNames } from '../constants';
import { WidgetPermissions } from '../types';

export const useColumns = ({
  permissions,
  triggerTemplates,
}: {
  permissions: WidgetPermissions;
  triggerTemplates: TriggerTemplateKubeObjectInterface[];
}): TableColumn<PipelineKubeObjectInterface>[] => {
  const { setDialog } = useDialogContext();
  const { loadSettings } = useTableSettings(TABLE.PIPELINE_LIST.id);

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
          ...getSyncedColumnData(tableSettings, columnNames.CREATED_AT, 20),
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
                    pipelineName: data?.metadata.name,
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
          isFixed: true,
          ...getSyncedColumnData(tableSettings, columnNames.DIAGRAM, 5),
          props: {
            align: 'center',
          },
        },
      },
      {
        id: columnNames.ACTIONS,
        label: 'Actions',
        data: {
          render: ({ data }) => (
            <Actions
              resource={data}
              permissions={permissions}
              triggerTemplates={triggerTemplates}
            />
          ),
        },
        cell: {
          isFixed: true,
          customizable: false,
          ...getSyncedColumnData(tableSettings, columnNames.ACTIONS, 5),
        },
      },
    ],
    [permissions, setDialog, tableSettings, triggerTemplates]
  );
};
