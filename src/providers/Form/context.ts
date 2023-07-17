import React from 'react';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { FormContextProviderValue } from './types';

export const FormContext = React.createContext<FormContextProviderValue>({
    formState: {} as UseFormReturn,
});
