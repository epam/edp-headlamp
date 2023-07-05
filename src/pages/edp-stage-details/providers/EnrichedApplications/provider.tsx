import React from 'react';
import { useEnrichedApplicationsWithImageStreamsQuery } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { useCDPipelineQueryContext } from '../CDPipelineQuery/hooks';
import { EnrichedApplicationsContext } from './context';

export const EnrichedApplicationsContextProvider: React.FC = ({ children }) => {
    const { CDPipelineQuery } = useCDPipelineQueryContext();

    const {
        isLoading: isEnrichedApplicationsWithImageStreamsQueryLoading,
        data: enrichedApplications,
    } = useEnrichedApplicationsWithImageStreamsQuery({
        props: {
            CDPipelineData: CDPipelineQuery?.data,
        },
    });

    const enrichedApplicationsValue = React.useMemo(
        () => !isEnrichedApplicationsWithImageStreamsQueryLoading && enrichedApplications,
        [enrichedApplications, isEnrichedApplicationsWithImageStreamsQueryLoading]
    );

    return (
        <EnrichedApplicationsContext.Provider
            value={{ enrichedApplications: enrichedApplicationsValue }}
        >
            {children}
        </EnrichedApplicationsContext.Provider>
    );
};
