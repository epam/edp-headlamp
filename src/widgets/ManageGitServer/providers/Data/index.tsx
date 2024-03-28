import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  gitServer,
  gitServerSecret,
}) => {
  return (
    <DataContext.Provider
      value={{
        gitServer,
        gitServerSecret,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
