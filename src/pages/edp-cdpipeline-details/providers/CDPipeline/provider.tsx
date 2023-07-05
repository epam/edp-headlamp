import React from 'react';
import { useParams } from 'react-router-dom';
import { useStreamCDPipeline } from '../../../../k8s/EDPCDPipeline/hooks/useStreamCDPipeline';
import { EDPCDPipelineRouteParams } from '../../types';
import { CDPipelineContext } from './context';

export const CDPipelineContextProvider: React.FC = ({ children }) => {
    const { namespace, name } = useParams<EDPCDPipelineRouteParams>();

    const CDPipeline = useStreamCDPipeline({
        namespace,
        CDPipelineMetadataName: name,
    });

    return (
        <CDPipelineContext.Provider value={{ CDPipeline }}>{children}</CDPipelineContext.Provider>
    );
};
