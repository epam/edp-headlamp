import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { MuiCore, pluginLib } from '../../../../plugin.globals';
import { CDPIPELINE_ROUTE_NAME } from '../../../../routes/names';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { CodebaseCDPipelineConflictErrorProps } from './types';

const { Typography } = MuiCore;
const { CommonComponents } = pluginLib;
const { Link } = CommonComponents;

export const CodebaseCDPipelineConflictError = ({
    conflictedCDPipeline,
    codebase,
}: CodebaseCDPipelineConflictErrorProps): React.ReactElement => {
    const conflictedCDPipelineKubeObject = new EDPCDPipelineKubeObject(conflictedCDPipeline);
    const conflictedCDPipelineRoute =
        conflictedCDPipelineKubeObject.getDetailsLink(CDPIPELINE_ROUTE_NAME);

    return (
        <>
            <Typography component={'span'}>
                {capitalizeFirstLetter(codebase.spec.type)} {codebase.metadata.name} is used in
            </Typography>
            <Link to={conflictedCDPipelineRoute}> {conflictedCDPipeline.metadata.name}</Link>
            <Typography component={'span'}> CD Pipeline</Typography>
        </>
    );
};
