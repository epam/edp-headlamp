import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  quickLink,
  codemie,
  codemieSecret,
  handleClosePanel,
}) => {
  return (
    <DataContext.Provider
      value={{
        quickLink,
        codemie,
        codemieSecret,
        handleClosePanel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
