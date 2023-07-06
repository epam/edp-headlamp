import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { routeEDPCDPipelineDetails } from '../../../../pages/edp-cdpipeline-details/route';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { useStyles } from './styles';
import { CodebaseCDPipelineConflictErrorProps } from './types';

export const CodebaseCDPipelineConflictError = ({
    conflictedCDPipeline,
    codebase,
}: CodebaseCDPipelineConflictErrorProps) => {
    const classes = useStyles();

    return (
        <div className={classes.message}>
            <Typography component={'span'}>
                {capitalizeFirstLetter(codebase.spec.type)} {codebase.metadata.name} is used in
            </Typography>
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
