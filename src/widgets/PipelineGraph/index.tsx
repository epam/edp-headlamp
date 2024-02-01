import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { Graph } from '../../components/Graph';
import { Edge } from '../../components/Graph/components/Edge';
import { Node } from '../../components/Graph/components/Node';
import { MyNode } from '../../components/Graph/components/types';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { PIPELINE_GRAPH_DIALOG_NAME } from './constants';
import { usePipelineGraphData } from './hooks/usePipelineGraphData';
import { useStyles } from './styles';
import { PipelineGraphDialogForwardedProps } from './types';

export const PipelineGraph = () => {
  const classes = useStyles();

  const {
    open,
    forwardedProps: { pipeline },
    closeDialog,
  } = useSpecificDialogContext<PipelineGraphDialogForwardedProps>(PIPELINE_GRAPH_DIALOG_NAME);

  const { nodes, edges } = usePipelineGraphData(pipeline);

  const diagramIsReady = nodes !== null && edges !== null;

  const renderNode = React.useCallback(
    (node: MyNode<{ name: string }>) => {
      const {
        data: { name },
      } = node;

      return (
        // @ts-ignore
        <Node {...node}>
          <Tooltip title={name} arrow placement={'bottom'}>
            <Grid container alignItems={'center'}>
              <Grid item style={{ overflow: 'hidden' }}>
                <Typography variant={'subtitle2'} className={classes.treeItemTitle}>
                  {name}
                </Typography>
              </Grid>
            </Grid>
          </Tooltip>
        </Node>
      );
    },
    [classes.treeItemTitle]
  );

  return (
    <Dialog open={open} fullWidth onClose={() => closeDialog()} maxWidth={'xl'}>
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
        <LoadingWrapper isLoading={!diagramIsReady}>
          {diagramIsReady && (
            <div>
              <Graph
                direction={'RIGHT'}
                nodes={nodes}
                edges={edges}
                id={'pipeline-run-steps'}
                renderEdge={(edge) => <Edge direction={'RIGHT'} {...edge} />}
                renderNode={renderNode}
              />
            </div>
          )}
        </LoadingWrapper>
      </DialogContent>
    </Dialog>
  );
};
