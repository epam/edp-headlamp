import { Grid } from '@mui/material';
import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { createVersioningString } from '../../../../../../utils/createVersioningString';
import { getVersionAndPostfixFromVersioningString } from '../../../../../../utils/getVersionAndPostfixFromVersioningString';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { BranchNameProps } from './types';

export const ReleaseBranchName = ({ defaultBranchVersion }: BranchNameProps) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useTypedFormContext();

  const releaseFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);

  const handleReleaseBranchNameFieldValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      const { release, releaseBranchVersionStart } = getValues();
      if (release || !defaultBranchVersion) {
        return;
      }

      const { postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);
      const newValue = value === '' ? postfix : `${value}-${postfix}`;

      setValue(CODEBASE_BRANCH_FORM_NAMES.releaseBranchVersionStart.name, newValue);
      setValue(
        CODEBASE_BRANCH_FORM_NAMES.version.name,
        createVersioningString(releaseBranchVersionStart, newValue)
      );
    },
    [defaultBranchVersion, getValues, setValue]
  );

  return (
    <Grid item xs={12}>
      <FormTextField
        {...register(CODEBASE_BRANCH_FORM_NAMES.releaseBranchName.name, {
          pattern: {
            value: /^[a-z0-9][a-z0-9\/\-.]*[a-z0-9]$/,
            message: `Branch name may contain only: lower-case letters, numbers, slashes, dashes and dots.
                        Can start and end only with lower-case letters and numbers. Minimum 2 characters.
                    `,
          },
          required: 'Enter release branch name',
          onChange: handleReleaseBranchNameFieldValueChange,
        })}
        label={'Branch Name'}
        title={'Type the branch name that will be created in the Version Control System.'}
        placeholder={'Enter Branch Name'}
        control={control}
        errors={errors}
        disabled={releaseFieldValue}
      />
    </Grid>
  );
};
