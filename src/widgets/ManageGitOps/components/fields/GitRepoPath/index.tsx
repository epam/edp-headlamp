import { InputAdornment } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { GIT_PROVIDER } from '../../../../../constants/gitProviders';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FieldEvent } from '../../../../../types/forms';
import { validateField, validationRules } from '../../../../../utils/formFieldValidation';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { ManageGitOpsDataContext, ManageGitOpsValues } from '../../../types';

// relative path should always start with slash

const slashSymbol = '/';

export const GitRepoPath = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useReactHookFormContext<ManageGitOpsValues>();

  const {
    formData: { isReadOnly },
  } = useFormContext<ManageGitOpsDataContext>();

  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitRepoPath.name);
  const nameFieldValue = watch(CODEBASE_FORM_NAMES.name.name);

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.gitRepoPath.name, {
        required: 'Enter relative path to repository.',
        validate: (value) => validateField(value, validationRules.GIT_URL_PATH),
        onChange: ({ target: { value } }: FieldEvent) => {
          const isGerrit = gitServerFieldValue === GIT_PROVIDER.GERRIT;

          setValue(
            CODEBASE_FORM_NAMES.gitUrlPath.name,
            isGerrit ? `/${nameFieldValue}` : `${value}/${nameFieldValue}`
          );
        },
      })}
      label={'Git repo relative path'}
      title={'Enter your account name where the repository will be stored.'}
      placeholder={
        'Indicate the repository relative path in the following format project/repository'
      }
      control={control}
      errors={errors}
      InputProps={{
        startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
      }}
      disabled={isReadOnly}
    />
  );
};
