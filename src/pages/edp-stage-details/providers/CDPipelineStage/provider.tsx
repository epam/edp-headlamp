import React from 'react';
import { useParams } from 'react-router-dom';
import { useStreamCDPipelineStage } from '../../../../k8s/EDPCDPipelineStage/hooks/useStreamCDPipelineStage';
import { EDPStageDetailsRouteParams } from '../../types';
import { CDPipelineStageContext } from './context';

export const CDPipelineStageContextProvider: React.FC = ({ children }) => {
    const { namespace, stageName } = useParams<EDPStageDetailsRouteParams>();

    const stage = useStreamCDPipelineStage({
        namespace,
        stageMetadataName: stageName,
    });

    const memoizedStage = React.useMemo(() => stage, [stage]);

    return (
        <CDPipelineStageContext.Provider value={{ stage: memoizedStage }}>
            {children}
        </CDPipelineStageContext.Provider>
    );
};
