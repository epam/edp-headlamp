import { Icon } from '@iconify/react';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineGraph } from '../../PipelineGraph';
import { PIPELINE_GRAPH_DIALOG_NAME } from './constants';
import { PipelineGraphDialogProps } from './types';

export const PipelineGraphDialog: React.FC<PipelineGraphDialogProps> = ({
  props: { pipeline },
  state: { closeDialog, open },
}) => {
  return (
    <Dialog open={open} fullWidth onClose={() => closeDialog()} maxWidth={'xl'}>
      <DialogTitle>
        <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
          <Grid item>
            <Typography variant={'h4'}>Pipeline: {pipeline?.metadata.name}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => closeDialog()} size="large">
              <Icon icon={ICONS.CROSS} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <PipelineGraph pipeline={pipeline} />
      </DialogContent>
    </Dialog>
  );
};

PipelineGraphDialog.displayName = PIPELINE_GRAPH_DIALOG_NAME;
