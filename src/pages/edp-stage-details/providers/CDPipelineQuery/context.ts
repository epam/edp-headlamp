import { React } from '../../../../plugin.globals';
import { CDPipelineContextProviderValue } from './types';

export const CDPipelineQueryContext = React.createContext<CDPipelineContextProviderValue>({
    CDPipelineQuery: null,
});
