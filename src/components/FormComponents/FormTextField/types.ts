import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

export interface FormTextFieldProps {
    name: string;
    label?: string;
    title?: string;
    control: Control;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    errors: FieldErrors;
}
