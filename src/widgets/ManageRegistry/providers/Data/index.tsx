import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  EDPConfigMap,
  pushAccountSecret,
  pullAccountSecret,
  permissions,
  tektonServiceAccount,
  handleCloseCreateDialog,
}) => {
  return (
    <DataContext.Provider
      value={{
        EDPConfigMap,
        pushAccountSecret,
        pullAccountSecret,
        permissions,
        tektonServiceAccount,
        handleCloseCreateDialog,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
