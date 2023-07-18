import { UseFormProps, UseFormReturn } from 'react-hook-form/dist/types';

export interface FormContextProviderValue<FormData = {}> {
    formData: FormData;
    formState?: UseFormReturn;
}

export interface FormContextProviderProps<FormData = {}> {
    formSettings: UseFormProps;
    formData?: FormData;
}
