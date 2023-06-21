import { React } from '../../../../plugin.globals';
import { CDPipelineStagesQueryContextProviderValue } from './types';

export const CDPipelineStagesQueryContext =
    React.createContext<CDPipelineStagesQueryContextProviderValue>({
        stagesQuery: null,
    });
