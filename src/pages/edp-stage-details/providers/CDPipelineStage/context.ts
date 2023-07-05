import React from 'react';
import { CDPipelineStageContextProviderValue } from './types';

export const CDPipelineStageContext = React.createContext<CDPipelineStageContextProviderValue>({
    stage: null,
});
