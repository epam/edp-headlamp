import { React } from '../../../../plugin.globals';
import { CDPipelineStagesContextProviderValue } from './types';

export const CDPipelineStagesContext = React.createContext<CDPipelineStagesContextProviderValue>({
    stages: [],
});
