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
    reset(formSettings.defaultValues, { keepValues: true });
  }, [formSettings, reset]);

  const providerValue = React.useMemo(() => ({ formData }), [formData]);

  return (
    <FormContext.Provider value={providerValue}>
      {/* @ts-ignore */}
      <FormProvider {...formState}>{children}</FormProvider>
    </FormContext.Provider>
  );
};
