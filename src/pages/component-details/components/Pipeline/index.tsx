import { Icon } from '@iconify/react';
import { Grid, IconButton, Link, Stack } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { PipelineKubeObject } from '../../../../k8s/groups/Tekton/Pipeline';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { PIPELINE_GRAPH_DIALOG_NAME } from '../../../../widgets/PipelineGraphDialog/constants';

export const Pipeline = ({ pipelineLink, pipelineName, namespace }) => {
  const [item] = PipelineKubeObject.useGet(pipelineName, namespace);

  const { setDialog } = useDialogContext();

  return (
    <Grid container spacing={2} alignItems={'center'} wrap={'nowrap'}>
      <Grid item>
        <Link href={pipelineLink} target={'_blank'} sx={{ wordBreak: 'break-all' }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <span>{pipelineName}</span>
            <span>
              <Icon icon={ICONS.NEW_WINDOW} />
            </span>
          </Stack>
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
