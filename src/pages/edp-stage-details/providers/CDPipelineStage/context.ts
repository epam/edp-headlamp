import { React } from '../../../../plugin.globals';
import { CDPipelineStageContextProviderValue } from './types';

export const CDPipelineStageContext = React.createContext<CDPipelineStageContextProviderValue>({
    stage: null,
});
