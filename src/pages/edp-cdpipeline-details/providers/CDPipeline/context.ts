import { React } from '../../../../plugin.globals';
import { CDPipelineContextProviderValue } from './types';

export const CDPipelineContext = React.createContext<CDPipelineContextProviderValue>({
    CDPipeline: null,
});
