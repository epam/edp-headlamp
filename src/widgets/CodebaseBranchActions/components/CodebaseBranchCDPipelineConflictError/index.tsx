import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@mui/material';
import React from 'react';
import { routeEDPCDPipelineDetails } from '../../../../pages/edp-cdpipeline-details/route';
import { useStyles } from './styles';
import { CodebaseBranchCDPipelineConflictErrorProps } from './types';

export const CodebaseBranchCDPipelineConflictError = ({
  conflictedCDPipeline,
  name,
}: CodebaseBranchCDPipelineConflictErrorProps) => {
  const classes = useStyles();

  return (
    <div className={classes.message}>
      <Typography component={'span'}>Branch {name} is used in </Typography>
      <div className={classes.conflictEntityName}>
        <Link
          routeName={routeEDPCDPipelineDetails.path}
          params={{
            name: conflictedCDPipeline.metadata.name,
            namespace: conflictedCDPipeline.metadata.namespace,
          }}
        >
          {conflictedCDPipeline.metadata.name}
        </Link>
      </div>
      <Typography component={'span'}> CD Pipeline</Typography>
    </div>
  );
};
