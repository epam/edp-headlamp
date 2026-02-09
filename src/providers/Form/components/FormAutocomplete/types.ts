import { Control, FieldErrors } from 'react-hook-form';

export interface FormAutocompleteProps<T> {
  name: string;
  control: Control<any>;
  defaultValue?: T;
  label?: string;
  title?: string;
  placeholder: string;
  disabled?: boolean;
  options: T[];
  errors: FieldErrors;
  InputProps?: {};
  AutocompleteProps?: {};
  TextFieldProps?: {};
}
