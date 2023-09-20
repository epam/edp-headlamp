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

    const baseDefaultValues = formSettings.defaultValues;

    React.useEffect(() => {
        reset(baseDefaultValues);
    }, [baseDefaultValues, reset]);

    const providerValue = React.useMemo(() => ({ formState, formData }), [formData, formState]);

    return (
        <FormContext.Provider value={providerValue}>
            <FormProvider {...formState}>{children}</FormProvider>
        </FormContext.Provider>
    );
};
