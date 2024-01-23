import { Icon } from '@iconify/react';
import { Grid, IconButton, Link } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PipelineKubeObject } from '../../../../k8s/Pipeline';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { PIPELINE_GRAPH_DIALOG_NAME } from '../../../../widgets/PipelineGraph/constants';

export const Pipeline = ({ pipelineLink, pipelineName, namespace }) => {
  const [item] = PipelineKubeObject.useGet(pipelineName, namespace);

  const { setDialog } = useDialogContext();

  return (
    <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
      <Grid item>
        <Link href={pipelineLink} target={'_blank'}>
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
