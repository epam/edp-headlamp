import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  secret,
  jiraServer,
  ownerReference,
  permissions,
  handleClosePanel,
}) => {
  return (
    <DataContext.Provider
      value={{
        secret,
        jiraServer,
        ownerReference,
        permissions,
        handleClosePanel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
