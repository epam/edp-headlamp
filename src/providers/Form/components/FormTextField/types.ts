import { InputProps } from '@material-ui/core';
import { StandardTextFieldProps } from '@material-ui/core';
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
    showLabelPlaceholder?: boolean;
    partiallyDisabled?: boolean;
    InputProps?: InputProps;
    TextFieldProps?: StandardTextFieldProps;
}
