import React from 'react';
import { DynamicDataContextProviderValue } from './types';

const createInitialData = <T>() => {
  return {
    data: null as T,
    error: null,
    isLoading: true,
  };
};

export const DynamicDataContext = React.createContext<DynamicDataContextProviderValue>({
  CDPipeline: createInitialData<DynamicDataContextProviderValue['CDPipeline']['data']>(),
  stages: createInitialData<DynamicDataContextProviderValue['stages']['data']>(),
  stagesWithApplicationsData:
    createInitialData<DynamicDataContextProviderValue['stagesWithApplicationsData']['data']>(),
  quickLinks: createInitialData<DynamicDataContextProviderValue['quickLinks']['data']>(),
  quickLinksURLs: createInitialData<DynamicDataContextProviderValue['quickLinksURLs']['data']>(),
});
