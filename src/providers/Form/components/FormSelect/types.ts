import React from 'react';
import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { SelectOption } from '../../../../types/forms';

export interface FormSelectProps {
  name: string;
  errors: FieldErrors;
  options: SelectOption[];
  control: Control<any>;
  label?: string;
  title?: string | React.ReactElement;
  defaultValue?: string;
  helperText?: string;
  disabled?: boolean;
}
