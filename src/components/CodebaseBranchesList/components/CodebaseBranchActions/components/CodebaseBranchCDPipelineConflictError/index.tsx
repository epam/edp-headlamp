import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Typography } from '@material-ui/core';
import React from 'react';
import { CDPIPELINES_ROUTE_NAME } from '../../../../../../routes/names';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../../utils/routes/createRouteName';
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
                    routeName={createRouteNameBasedOnNameAndNamespace(CDPIPELINES_ROUTE_NAME)}
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
