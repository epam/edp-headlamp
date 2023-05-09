import { GridSize } from '@material-ui/core';
import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { React } from '../../../../plugin.globals';

export interface MainRadioGroupOption {
    value: string;
    label: string;
    description?: string;
    icon: React.ReactElement;
    checkedIcon: React.ReactElement;
    disabled?: boolean;
}

export interface MainRadioGroupProps {
    name: string;
    control: Control;
    errors: FieldErrors;
    gridItemSize: GridSize;
    options: MainRadioGroupOption[];
}
