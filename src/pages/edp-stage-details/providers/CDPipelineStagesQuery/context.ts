import React from 'react';
import { CDPipelineStagesQueryContextProviderValue } from './types';

export const CDPipelineStagesQueryContext =
    React.createContext<CDPipelineStagesQueryContextProviderValue>({
        stagesQuery: null,
    });
