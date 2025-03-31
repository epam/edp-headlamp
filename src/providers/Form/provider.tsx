import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormContext } from './context';
import { FormContextProviderProps } from './types';

export const FormContextProvider: React.FC<FormContextProviderProps> = ({
  children,
  formSettings,
  formData,
}) => {
  const formState = useForm(formSettings);
  const { reset } = formState;

  React.useEffect(() => {
    reset(formSettings.defaultValues);
  }, [formSettings.defaultValues, reset]);

  const providerValue = React.useMemo(() => ({ formData }), [formData]);

  return (
    <FormContext.Provider value={providerValue}>
      <FormProvider {...formState}>{children}</FormProvider>
    </FormContext.Provider>
  );
};
