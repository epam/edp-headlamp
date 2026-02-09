import { FormControlLabelProps } from '@mui/material';
import React from 'react';
import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

export interface FormSwitchProps {
  name: string;
  label: React.ReactElement;
  control: Control<any>;
  errors: FieldErrors;
  defaultValue?: boolean;
  disabled?: boolean;
  align?: React.CSSProperties['justifyContent'];
  labelPlacement?: FormControlLabelProps['labelPlacement'];
}
