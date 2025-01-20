import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { IconButton } from '@mui/material';
import React from 'react';
import { TableColumn } from '../../../components/Table/types';
import { TextWithTooltip } from '../../../components/TextWithTooltip';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineKubeObjectInterface } from '../../../k8s/groups/Tekton/Pipeline/types';
import { routePipelineDetails } from '../../../pages/configuration/pages/pipeline-details/route';
import { useDialogContext } from '../../../providers/Dialog/hooks';
import { PipelineGraphDialog } from '../../dialogs/PipelineGraph';

export const useColumns = (): TableColumn<PipelineKubeObjectInterface>[] => {
  const { setDialog } = useDialogContext();

  return React.useMemo(
    () => [
      {
        id: 'name',
        label: 'Name',
        columnSortableValuePath: 'metadata.name',
        render: ({ metadata: { name, namespace } }) => (
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
      {
        id: 'diagram',
        label: 'Diagram',
        render: (resource) => {
          return (
            <IconButton
              onClick={() =>
                setDialog(PipelineGraphDialog, {
                  pipeline: resource,
                })
              }
              size="medium"
            >
              <Icon icon={ICONS.DIAGRAM} />
            </IconButton>
          );
        },
        width: '5%',
        textAlign: 'center',
      },
    ],
    [setDialog]
  );
};
