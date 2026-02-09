import { InputAdornment } from '@mui/material';
import React from 'react';
import { GIT_PROVIDER } from '../../../../../../constants/gitProviders';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { validateField, validationRules } from '../../../../../../utils/formFieldValidation';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';

const slashSymbol = '/';

export const GitUrlPath = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useTypedFormContext();

  const gitServerFieldValue = watch(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitServer.name);

  const title =
    gitServerFieldValue === GIT_PROVIDER.GITLAB
      ? 'Specify the codebase repository name in the following format: username/repository_name.'
      : 'Specify the codebase repository name.';

  return (
    <FormTextField
      {...register(CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitUrlPath.name, {
        required: 'Enter relative path to repository.',
        validate: (value) => validateField(value, validationRules.GIT_URL_PATH),
      })}
      label={'Repository name'}
      title={title}
      placeholder={
        'Indicate the repository relative path in the following format project/repository'
      }
      control={control}
      errors={errors}
      InputProps={{
        startAdornment: <InputAdornment position="start">{slashSymbol}</InputAdornment>,
      }}
    />
  );
};
