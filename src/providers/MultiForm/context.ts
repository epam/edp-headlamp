import React from 'react';
import { MultiFormContextProviderValue } from './types';

export const MultiFormContext = React.createContext<MultiFormContextProviderValue>({
  registerForm: () => {
    //
  },
  unregisterForm: () => {
    //
  },
  resetAll: () => {
    //
  },
  isAnyFormDirty: false,
});
