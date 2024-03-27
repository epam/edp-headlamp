import React from 'react';
import { FORM_MODES } from '../../../../types/forms';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  gitServer: null,
  gitServerSecret: null,
  chosenGitProvider: null,
  setChosenGitProvider: () => {
    //
  },
  gitServerFormMode: FORM_MODES.CREATE,
  credentialsFormMode: FORM_MODES.CREATE,
  handleClosePanel: () => {
    //
  },
});
