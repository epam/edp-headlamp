import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  gitServer,
  gitServerSecret,
  permissions,
}) => {
  return (
    <DataContext.Provider
      value={{
        gitServer,
        gitServerSecret,
        permissions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
