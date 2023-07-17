import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { UseFormProps } from 'react-hook-form/dist/types';
import { FormContext } from './context';

export const FormContextProvider: React.FC<{
    formSettings: UseFormProps;
}> = ({ children, formSettings }) => {
    const formState = useForm(formSettings);

    return (
        <FormContext.Provider value={{ formState }}>
            <FormProvider {...formState}>{children}</FormProvider>
        </FormContext.Provider>
    );
};
