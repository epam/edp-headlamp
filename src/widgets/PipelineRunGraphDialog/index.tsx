import { Icon } from '@iconify/react';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { BorderedSection } from '../../components/BorderedSection';
import { InfoColumns } from '../../components/InfoColumns';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { rem } from '../../utils/styling/rem';
import { PipelineRunGraph } from '../PipelineRunGraph';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from './constants';
import { useInfoRows } from './hooks/useInfoRows';
import { useStyles } from './styles';
import { PipelineRunGraphDialogForwardedProps } from './types';

export const PipelineRunGraphDialog = () => {
  const classes = useStyles();

  const {
    open,
    forwardedProps: { pipelineRun },
    closeDialog,
  } = useSpecificDialogContext<PipelineRunGraphDialogForwardedProps>(
    PIPELINE_RUN_GRAPH_DIALOG_NAME
  );

  const infoRows = useInfoRows();

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={() => closeDialog()}
      maxWidth={'xl'}
      className={classes.dialog}
    >
      <DialogTitle>
        <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
          <Grid item>
            <Typography variant={'h4'}>Tree Diagram</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => closeDialog()} size="large">
              <Icon icon={ICONS.CROSS} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BorderedSection title="Details">
              <InfoColumns infoRows={infoRows} />
            </BorderedSection>
          </Grid>
          <Grid item xs={12} style={{ minHeight: rem(300) }}>
            <PipelineRunGraph pipelineRun={pipelineRun} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
