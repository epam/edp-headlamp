import { Grid, useTheme } from '@mui/material';
import React from 'react';
import { FORM_CONTROL_LABEL_HEIGHT } from '../../../../../../constants/ui';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';

export const DefaultBranchVersion = () => {
  const theme = useTheme();

  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormTextField
          {...register(CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionStart.name, {
            required: 'Default branch version',
            pattern: {
              value: /^([0-9]+)\.([0-9]+)\.([0-9]+)?$/,
              message: 'Enter valid semantic versioning format',
            },
          })}
          label={'Default branch version'}
          title={'Enter the necessary branch version for the artifact.'}
          placeholder={'0.0.0'}
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={6} sx={{ mt: theme.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT) }}>
        <FormTextField
          {...register(CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionPostfix.name, {
            required: 'Default branch version',
          })}
          placeholder={'SNAPSHOT'}
          control={control}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};
