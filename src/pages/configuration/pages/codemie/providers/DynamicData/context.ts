import React from 'react';
import { DynamicDataContextProviderValue } from './types';

const initialData = {
  data: null,
  isLoading: true,
  error: null,
};

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  codemie: initialData,
  codemieProject: initialData,
  codemieProjectSettings: initialData,
  codemieApplications: initialData,
  codemieSecret: initialData,
  codemieQuickLink: initialData,
});
