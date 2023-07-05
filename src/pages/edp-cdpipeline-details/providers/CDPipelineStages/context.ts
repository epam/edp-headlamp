import React from 'react';
import { CDPipelineStagesContextProviderValue } from './types';

export const CDPipelineStagesContext = React.createContext<CDPipelineStagesContextProviderValue>({
    stages: [],
});
