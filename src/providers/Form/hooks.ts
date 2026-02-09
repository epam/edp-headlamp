import React from 'react';
import { FormContext } from './context';
import { FormContextProviderValue } from './types';

export const useFormContext = <FormData>() =>
  React.useContext<FormContextProviderValue<FormData>>(FormContext);
