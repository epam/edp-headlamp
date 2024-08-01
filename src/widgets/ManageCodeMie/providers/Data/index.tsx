import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  quickLink,
  codemie,
  codemieSecret,
  codemieProject,
  codemieProjectSettings,
  codemieProjectSettingsSecret,
  handleClosePanel,
}) => {
  return (
    <DataContext.Provider
      value={{
        quickLink,
        codemie,
        codemieSecret,
        codemieProject,
        codemieProjectSettings,
        codemieProjectSettingsSecret,
        handleClosePanel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
