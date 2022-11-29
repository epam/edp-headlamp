import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { React } from '../../../plugin.globals';
import { SelectOption } from '../../../types/forms';

export interface FormSelectProps {
    name: string;
    label?: string;
    title?: string | React.ReactElement;
    placeholder?: string;
    control: Control;
    defaultValue?: string;
    errors: FieldErrors;
    options: SelectOption[];
    disabled?: boolean;
}
