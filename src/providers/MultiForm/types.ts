import { UseFormReturn } from 'react-hook-form';
import { FORM_MODES } from '../../types/forms';
import { ValueOf } from '../../types/global';

export type FormItem = {
  mode: ValueOf<typeof FORM_MODES>;
  form: UseFormReturn<any, any, undefined>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  allowedToSubmit: {
    isAllowed: boolean;
    reason: string | undefined;
  };
};

export interface MultiFormContextProviderValue<FormName extends string> {
  forms: { [formName in FormName]: FormItem };
  sharedForm: UseFormReturn<any, any, undefined>;
  resetAll: () => void;
  submitAll: (dirty?: boolean) => void;
  isAnyFormDirty: boolean;
  isAnyFormForbiddenToSubmit: boolean;
  isAnyFormSubmitting: boolean;
}

export interface MultiFormContextProviderProps<FormName extends string> {
  children: React.ReactNode;
  forms: { [formName in FormName]: FormItem };
  sharedForm: UseFormReturn<any, any, undefined>;
}
