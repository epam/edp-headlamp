import React from 'react';
import { FormContextProvider } from '../../../../providers/Form';
import { Inner } from './components/Inner';
import { useDefaultValues } from './hooks/useDefaultValues';

export const Create = () => {
  const baseDefaultValues = useDefaultValues();

  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
        defaultValues: baseDefaultValues,
      }}
    >
      <Inner baseDefaultValues={baseDefaultValues} />
    </FormContextProvider>
  );
};
