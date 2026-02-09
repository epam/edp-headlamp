import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  secret,
  quickLink,
  mode,
  ownerReference,
  permissions,
  handleClosePanel,
}) => {
  return (
    <DataContext.Provider
      value={{
        secret,
        quickLink,
        mode,
        ownerReference,
        permissions,
        handleClosePanel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
