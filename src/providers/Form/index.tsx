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

    return (
        <FormContext.Provider value={{ formState, formData }}>
            <FormProvider {...formState}>{children}</FormProvider>
        </FormContext.Provider>
    );
};
