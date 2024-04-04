import { Grid, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FORM_CONTROL_LABEL_HEIGHT } from '../../../../../constants/ui';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../types/forms';
import { createReleaseNameString } from '../../../../../utils/createReleaseNameString';
import { createVersioningString } from '../../../../../utils/createVersioningString';
import { getMajorMinorPatchOfVersion } from '../../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../../utils/getVersionAndPostfixFromVersioningString';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { CreateCodebaseBranchFormValues } from '../../../types';

export const BranchVersion = () => {
  const theme = useTheme();

  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<CreateCodebaseBranchFormValues>();

  const onBranchVersionStartFieldValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent): void => {
      const { release, releaseBranchVersionPostfix } = getValues();
      const branchVersion = createVersioningString(value, releaseBranchVersionPostfix);

      setValue(CODEBASE_BRANCH_FORM_NAMES.version.name, branchVersion);

      if (!release) {
        return;
      }

      const { version } = getVersionAndPostfixFromVersioningString(branchVersion);
      const { major, minor, patch } = getMajorMinorPatchOfVersion(version);
      const newDefaultBranchMinor = minor + 1;
      const defaultBranchNewVersion = [major, newDefaultBranchMinor, patch].join('.');
      setValue(
        CODEBASE_BRANCH_FORM_NAMES.releaseBranchName.name,
        createReleaseNameString(major, minor)
      );
      setValue(CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionStart.name, defaultBranchNewVersion);
    },
    [getValues, setValue]
  );

  const onBranchVersionPostfixFieldValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent): void => {
      const { releaseBranchVersionStart } = getValues();

      const branchVersion = createVersioningString(releaseBranchVersionStart, value);
      setValue(CODEBASE_BRANCH_FORM_NAMES.version.name, branchVersion);
    },
    [getValues, setValue]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormTextField
          {...register(CODEBASE_BRANCH_FORM_NAMES.releaseBranchVersionStart.name, {
            required: 'Branch version',
            onBlur: onBranchVersionStartFieldValueChange,
            pattern: {
              value: /^([0-9]+)\.([0-9]+)\.([0-9]+)?$/,
              message: 'Enter valid semantic versioning format',
            },
          })}
          label={'Branch version'}
          title={'Valid identifiers are in the set [A-Za-z0-9]'}
          placeholder={'0.0.0'}
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={6} sx={{ mt: theme.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT) }}>
        <FormTextField
          {...register(CODEBASE_BRANCH_FORM_NAMES.releaseBranchVersionPostfix.name, {
            onBlur: onBranchVersionPostfixFieldValueChange,
          })}
          placeholder={'SNAPSHOT'}
          control={control}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};
