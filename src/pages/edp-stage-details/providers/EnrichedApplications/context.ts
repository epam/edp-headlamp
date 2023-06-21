import { React } from '../../../../plugin.globals';
import { EnrichedApplicationsContextProviderValue } from './types';

export const EnrichedApplicationsContext =
    React.createContext<EnrichedApplicationsContextProviderValue>({
        enrichedApplications: [],
    });
