import { EDPCDPipelineKubeObject } from '../../../../../../k8s/EDPCDPipeline';
import { MuiCore, pluginLib, React } from '../../../../../../plugin.globals';
import { CDPIPELINE_ROUTE_NAME } from '../../../../../../routes/names';
import { CodebaseBranchCDPipelineConflictErrorProps } from './types';

const { Typography } = MuiCore;
const { CommonComponents } = pluginLib;
const { Link } = CommonComponents;

export const CodebaseBranchCDPipelineConflictError = ({
    conflictedCDPipeline,
    name,
}: CodebaseBranchCDPipelineConflictErrorProps): React.ReactElement => {
    const conflictedCDPipelineKubeObject = new EDPCDPipelineKubeObject(conflictedCDPipeline);
    const conflictedCDPipelineRoute =
        conflictedCDPipelineKubeObject.getDetailsLink(CDPIPELINE_ROUTE_NAME);

    return (
        <>
            <Typography component={'span'}>Branch {name} is used in </Typography>
            <Link to={conflictedCDPipelineRoute} routeName={null} kubeObject={null}>
                {conflictedCDPipeline.metadata.name}
            </Link>
            <Typography component={'span'}> CD Pipeline</Typography>
        </>
    );
};
