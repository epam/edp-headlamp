import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PipelineKubeObject } from '../../../../k8s/groups/Tekton/Pipeline';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { PIPELINE_GRAPH_DIALOG_NAME } from '../../../../widgets/PipelineGraphDialog/constants';
import { routePipelineDetails } from '../../../configuration/pages/pipeline-details/route';

export const Pipeline = ({
  pipelineName,
  namespace,
}: {
  pipelineName: string;
  namespace: string;
}) => {
  const [item] = PipelineKubeObject.useGet(pipelineName, namespace);

  const { setDialog } = useDialogContext();

  return (
    <Grid container spacing={2} alignItems={'center'} wrap={'nowrap'}>
      <Grid item>
        <Link
          routeName={routePipelineDetails.path}
          params={{
            name: pipelineName,
            namespace,
          }}
        >
          {pipelineName}
        </Link>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() =>
            setDialog({
              modalName: PIPELINE_GRAPH_DIALOG_NAME,
              forwardedProps: {
                pipeline: item,
              },
            })
          }
          size={'small'}
        >
          <Icon icon={ICONS.DIAGRAM} width={20} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
