import { InputProps, StandardTextFieldProps } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';

export interface FormAutocompleteSingleProps<T> {
  name: string;
  control: Control<any>;
  defaultValue?: T;
  label?: string;
  title?: string;
  placeholder: string;
  disabled?: boolean;
  options: T[];
  errors: FieldErrors;
  allowCustomInput?: boolean;
  AutocompleteProps?: {};
  InputProps?: InputProps;
  TextFieldProps?: StandardTextFieldProps;
}
