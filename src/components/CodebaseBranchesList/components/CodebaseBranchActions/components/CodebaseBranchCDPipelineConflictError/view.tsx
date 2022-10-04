import { EDPCDPipelineKubeObject } from '../../../../../../k8s/EDPCDPipeline';
import { MuiCore, pluginLib, React } from '../../../../../../plugin.globals';
import { CDPIPELINE_ROUTE_NAME } from '../../../../../../routes/names';
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
    const conflictedCDPipelineKubeObject = new EDPCDPipelineKubeObject(conflictedCDPipeline);
    const conflictedCDPipelineRoute =
        conflictedCDPipelineKubeObject.getDetailsLink(CDPIPELINE_ROUTE_NAME);

    return (
        <div className={classes.message}>
            <Typography component={'span'}>Branch {name} is used in </Typography>
            <div className={classes.conflictEntityName}>
                <Link to={conflictedCDPipelineRoute} routeName={null} kubeObject={null}>
                    {conflictedCDPipeline.metadata.name}
                </Link>
            </div>
            <Typography component={'span'}> CD Pipeline</Typography>
        </div>
    );
};
