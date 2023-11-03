import React from 'react';
import { DynamicDataContextProviderValue } from './types';

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
    data: {
        gitServer: null,
        gitServerSecret: null,
    },
    isLoading: false,
});
