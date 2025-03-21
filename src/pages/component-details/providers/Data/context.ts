import React from 'react';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  depTrackData: {
    data: {
      metrics: undefined,
      baseUrl: undefined,
      projectID: undefined,
    },
    isLoading: true,
    error: null,
  },
  sonarData: {
    data: {
      metrics: undefined,
      baseUrl: undefined,
    },
    isLoading: true,
    error: null,
  },
});
