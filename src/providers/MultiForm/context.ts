import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MultiFormContextProviderValue } from './types';

export const MultiFormContext = React.createContext<MultiFormContextProviderValue<string>>({
  forms: {},
  sharedForm: {} as UseFormReturn<any, any, undefined>,
  resetAll: () => {
    //
  },
  submitAll: async () => {
    return false;
  },
  isAnyFormDirty: false,
  isAnyFormSubmitting: false,
  isAnyFormForbiddenToSubmit: false,
});
