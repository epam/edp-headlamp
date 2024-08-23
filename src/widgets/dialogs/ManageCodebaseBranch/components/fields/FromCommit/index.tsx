import { Grid } from '@mui/material';
import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';

export const FromCommit = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useTypedFormContext();

  return (
    <Grid item xs={12}>
      <FormTextField
        {...register(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name, {
          pattern: {
            value: /\b([a-f0-9]{40})\b/,
            message: 'Enter valid commit hash',
          },
        })}
        label={'From Commit Hash '}
        title={
          'The new branch will be created starting from the selected commit hash. If this field is empty, the Default branch will be used.'
        }
        placeholder={'Enter Commit'}
        control={control}
        errors={errors}
      />
    </Grid>
  );
};
