import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  quickLink,
  codemie,
  codemieSecret,
  permissions,
  handleClosePanel,
}) => {
  return (
    <DataContext.Provider
      value={{
        quickLink,
        codemie,
        codemieSecret,
        permissions,
        handleClosePanel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
