import React from 'react';
import { useParams } from 'react-router-dom';
import { useCDPipelineByNameQuery } from '../../../../k8s/EDPCDPipeline/hooks/useCDPipelineByNameQuery';
import { EDPStageDetailsRouteParams } from '../../types';
import { CDPipelineQueryContext } from './context';

export const CDPipelineQueryContextProvider: React.FC = ({ children }) => {
    const { CDPipelineName } = useParams<EDPStageDetailsRouteParams>();

    const query = useCDPipelineByNameQuery({
        props: {
            name: CDPipelineName,
        },
        options: {
            enabled: !!CDPipelineName,
        },
    });

    const CDPipelineQuery = React.useMemo(() => query, [query]);

    return (
        <CDPipelineQueryContext.Provider value={{ CDPipelineQuery }}>
            {children}
        </CDPipelineQueryContext.Provider>
    );
};
