import React from 'react';
import { CDPipelineContextProviderValue } from './types';

export const CDPipelineContext = React.createContext<CDPipelineContextProviderValue>({
    CDPipeline: null,
});
