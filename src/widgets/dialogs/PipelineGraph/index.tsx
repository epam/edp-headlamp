import { Icon } from '@iconify/react';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ErrorContent } from '../../../components/ErrorContent';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineGraph } from '../../PipelineGraph';
import { PIPELINE_GRAPH_DIALOG_NAME } from './constants';
import { PipelineGraphDialogProps } from './types';

export const PipelineGraphDialog: React.FC<PipelineGraphDialogProps> = ({
  props: { pipeline, pipelineName },
  state: { closeDialog, open },
}) => {
  return (
    <Dialog open={open} fullWidth onClose={() => closeDialog()} maxWidth={pipeline ? 'xl' : 'sm'}>
      <DialogTitle>
        <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
          <Grid item>
            <Typography variant={'h4'}>
              {pipeline ? `Pipeline: ${pipeline?.metadata.name}` : 'Not found'}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => closeDialog()} size="large">
              <Icon icon={ICONS.CROSS} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {pipeline ? (
          <PipelineGraph pipeline={pipeline} />
        ) : (
          <ErrorContent
            error={{
              status: 404,
              message: `Pipeline ${pipelineName} is not found`,
              name: pipelineName,
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

PipelineGraphDialog.displayName = PIPELINE_GRAPH_DIALOG_NAME;
