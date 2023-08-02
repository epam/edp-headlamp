import React from 'react';
import { EnrichedApplicationsContextProviderValue } from './types';

export const EnrichedApplicationsContext =
    React.createContext<EnrichedApplicationsContextProviderValue>({
        enrichedApplications: null,
    });
