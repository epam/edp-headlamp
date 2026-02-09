import { AutocompleteProps, StandardTextFieldProps } from '@mui/material';
import {
  Control,
  FieldErrors,
  FieldPath,
  FieldValues,
  Path,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { SelectOption } from '../../../../types/forms';

export interface FormAutocompleteSingleProps<
  TOption extends SelectOption = SelectOption,
  TFieldValues extends FieldValues = FieldValues
> extends Partial<UseFormRegisterReturn<Path<TFieldValues>>> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  options: TOption[];
  label?: string;
  tooltipText?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  TextFieldProps?: StandardTextFieldProps;
  AutocompleteProps?: Partial<
    Omit<AutocompleteProps<TOption, boolean, boolean, boolean>, 'renderInput' | 'options'>
  >;
}
