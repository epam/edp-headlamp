import { MuiCore, pluginLib, React } from '../../../../../../../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../../../../../../../routes/names';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../../../../utils/routes/createRouteName';
import { useStyles } from './styles';
import { CodebaseBranchCDPipelineConflictErrorProps } from './types';

const { Typography } = MuiCore;
const { CommonComponents } = pluginLib;
const { Link } = CommonComponents;

export const CodebaseBranchCDPipelineConflictError = ({
    conflictedCDPipeline,
    name,
}: CodebaseBranchCDPipelineConflictErrorProps): React.ReactElement => {
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
