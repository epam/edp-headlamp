import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  secret,
  jiraServer,
  ownerReference,
  handleClosePanel,
}) => {
  return (
    <DataContext.Provider
      value={{
        secret,
        jiraServer,
        ownerReference,
        handleClosePanel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
