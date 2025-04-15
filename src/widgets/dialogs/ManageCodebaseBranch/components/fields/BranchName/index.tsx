import { Grid } from '@mui/material';
import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { createVersioningString } from '../../../../../../utils/createVersioningString';
import { getVersionAndPostfixFromVersioningString } from '../../../../../../utils/getVersionAndPostfixFromVersioningString';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { BranchNameProps } from './types';

export const BranchName = ({ defaultBranchVersion }: BranchNameProps) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useTypedFormContext();

  const {
    props: { codebaseBranches },
  } = useCurrentDialog();

  const existingCodebaseBranchs = codebaseBranches.map(
    (codebaseBranch) => codebaseBranch.spec.branchName
  );

  const releaseFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);

  const handleReleaseBranchNameFieldValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      const { release, releaseBranchVersionStart } = getValues();
      if (release || !defaultBranchVersion) {
        return;
      }

      const { postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);
      const newValue = value === '' ? postfix : `${value}-${postfix}`;

      setValue(CODEBASE_BRANCH_FORM_NAMES.releaseBranchVersionPostfix.name, newValue);
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
        {...register(CODEBASE_BRANCH_FORM_NAMES.branchName.name, {
          pattern: {
            value: /^(?![\/\.\-])[A-Za-z0-9\/\._\-]*(?<![\/\.\-])$/,
            message: `Branch name may contain: upper-case and lower-case letters, numbers, slashes (/), dashes (-), dots (.), and underscores (_).
                      It cannot start or end with a slash (/), dot (.), or dash (-). Consecutive special characters are not allowed.
                      Minimum 2 characters.`,
          },
          validate: (value) => {
            if (existingCodebaseBranchs.includes(value)) {
              return `Branch name "${value}" already exists`;
            }
            return true;
          },
          required: 'Enter branch name',
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
