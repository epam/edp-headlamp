import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@mui/material';
import React from 'react';
import { routeCDPipelineDetails } from '../../../../../../../../pages/cdpipeline-details/route';
import { useStyles } from './styles';
import { ClusterCDPipelineConflictErrorProps } from './types';

export const ClusterCDPipelineConflictError = ({
  conflictedStage,
  clusterName,
}: ClusterCDPipelineConflictErrorProps) => {
  const classes = useStyles();

  return (
    <div className={classes.message}>
      <Typography component={'span'}>{clusterName} is used in</Typography>
      <div className={classes.conflictEntityName}>
        <Link
          routeName={routeCDPipelineDetails.path}
          params={{
            name: conflictedStage?.spec.cdPipeline,
            namespace: conflictedStage?.metadata.namespace,
          }}
        >
          {conflictedStage?.spec.cdPipeline}
        </Link>
      </div>
      <Typography component={'span'}> CD Pipeline</Typography>
    </div>
  );
};
