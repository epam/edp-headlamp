import { Icon } from '@iconify/react';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';

export interface VariableRowProps {
  index: number;
  register: UseFormRegister<{ variables: Array<{ key: string; value: string }> }>;
  control: Control<{ variables: Array<{ key: string; value: string }> }>;
  errors: FieldErrors<{ variables: Array<{ key: string; value: string }> }>;
  onDelete: () => void;
}

export const VariableRow: React.FC<VariableRowProps> = ({
  index,
  register,
  control,
  errors,
  onDelete,
}) => {
  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={5}>
        <FormTextField
          {...register(`variables.${index}.key`, {
            required: 'Key is required',
          })}
          label="Key"
          placeholder="e.g. BUILD_TYPE"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={6}>
        <FormTextField
          {...register(`variables.${index}.value`)}
          label="Value"
          placeholder="e.g. release"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={onDelete} size="small" color="error">
          <Icon icon={ICONS.BUCKET} width={20} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
