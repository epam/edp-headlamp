import React from 'react';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  gitServer,
  gitServerSecret,
  chosenGitProvider,
  setChosenGitProvider,
  gitServerFormMode,
  credentialsFormMode,
  handleClosePanel,
}) => {
  return (
    <DataContext.Provider
      value={{
        gitServer,
        gitServerSecret,
        chosenGitProvider,
        setChosenGitProvider,
        gitServerFormMode,
        credentialsFormMode,
        handleClosePanel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
