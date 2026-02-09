import { Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Graph } from '../../components/Graph';
import { Edge } from '../../components/Graph/components/Edge';
import { Node } from '../../components/Graph/components/Node';
import { MyNode } from '../../components/Graph/components/types';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { usePipelineGraphData } from './hooks/usePipelineGraphData';
import { useStyles } from './styles';
import { PipelineGraphProps } from './types';

export const PipelineGraph = ({ pipeline }: PipelineGraphProps) => {
  const classes = useStyles();

  const { nodes, edges } = usePipelineGraphData(pipeline);

  const diagramIsReady = nodes !== null && edges !== null;

  const renderNode = React.useCallback(
    (node: MyNode<{ name: string }>) => {
      const {
        data: { name },
      } = node;

      return (
        //@ts-ignore
        <Node {...node}>
          {/* @ts-ignore */}
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
    <LoadingWrapper isLoading={!diagramIsReady}>
      {diagramIsReady && (
        <div>
          <Graph
            direction={'RIGHT'}
            nodes={nodes}
            edges={edges}
            id={'pipeline-steps'}
            renderEdge={(edge) => <Edge direction={'RIGHT'} {...edge} />}
            renderNode={renderNode}
          />
        </div>
      )}
    </LoadingWrapper>
  );
};
