import { UseFormReturn } from 'react-hook-form';

export type FormItem = UseFormReturn<any, any, undefined>;

export interface MultiFormContextProviderValue {
  registerForm: (formName: string, form: FormItem) => void;
  unregisterForm: (formName: string, form: FormItem) => void;
  resetAll: () => void;
  isAnyFormDirty: boolean;
}
