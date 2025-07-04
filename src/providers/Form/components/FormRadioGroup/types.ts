import React from 'react';
import { Control } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { FieldEvent } from '../../../../types/forms';

export interface FormRadioOption {
  value: string;
  label: string;
  icon: React.ReactElement;
  checkedIcon: React.ReactElement;
  disabled?: boolean;
  disabledTooltip?: string;
}

export interface FormRadioProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  options: FormRadioOption[];
  label: string;
  title?: string;
  disabled?: boolean;
  onChange?: ({ target, type }: FieldEvent) => void;
  defaultValue?: string;
}
