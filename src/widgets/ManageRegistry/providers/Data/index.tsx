import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  EDPConfigMap,
  pushAccountSecret,
  pullAccountSecret,
  tektonServiceAccount,
}) => {
  return (
    <DataContext.Provider
      value={{
        EDPConfigMap,
        pushAccountSecret,
        pullAccountSecret,
        tektonServiceAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
