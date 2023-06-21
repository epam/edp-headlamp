import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../../../routes/names';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../utils/routes/createRouteName';
import { useStyles } from './styles';
import { CodebaseCDPipelineConflictErrorProps } from './types';

const { Typography } = MuiCore;
const { CommonComponents } = pluginLib;
const { Link } = CommonComponents;

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
