import { InputProps } from '@mui/material';
import { StandardTextFieldProps } from '@mui/material';
import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

export interface FormTextFieldProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  label?: string;
  title?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  InputProps?: InputProps;
  TextFieldProps?: StandardTextFieldProps;
}
