import React from 'react';
import { FORM_MODES } from '../../../../types/forms';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  secret: null,
  quickLink: null,
  mode: FORM_MODES.CREATE,
  ownerReference: null,
  handleClosePanel: () => {
    //
  },
  permissions: null,
});
