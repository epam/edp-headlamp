import { UseFormProps } from 'react-hook-form/dist/types';

export interface FormContextProviderValue<FormData = {}> {
  formData: FormData;
}

export interface FormContextProviderProps<FormData = {}> {
  formSettings: UseFormProps;
  formData?: FormData;
}
