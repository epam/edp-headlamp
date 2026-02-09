import React from 'react';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  CDPipeline: {
    data: null,
    isLoading: true,
    error: null,
  },
  stages: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  enrichedApplications: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  gitOpsCodebase: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  QuickLinks: {
    data: undefined,
    isLoading: true,
    error: null,
  },
  QuickLinksURLs: {
    data: undefined,
    isLoading: true,
    error: null,
  },
});
