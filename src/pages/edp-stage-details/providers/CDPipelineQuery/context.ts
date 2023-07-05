import React from 'react';
import { CDPipelineContextProviderValue } from './types';

export const CDPipelineQueryContext = React.createContext<CDPipelineContextProviderValue>({
    CDPipelineQuery: null,
});
