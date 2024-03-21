import React from 'react';
import { DataContextProviderValue } from './types';

const initialData = {
  data: null,
  isLoading: true,
  error: null,
};

export const DataContext = React.createContext<DataContextProviderValue>({
  CDPipeline: initialData,
  stages: initialData,
  enrichedApplications: initialData,
  gitOpsCodebase: initialData,
  QuickLinks: initialData,
  QuickLinksURLs: initialData,
});
