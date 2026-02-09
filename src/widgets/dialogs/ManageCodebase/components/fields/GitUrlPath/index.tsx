import React from 'react';
import { GIT_PROVIDER } from '../../../../../../constants/gitProviders';
import { useGitServerListQuery } from '../../../../../../k8s/groups/EDP/GitServer/hooks/useGitServerListQuery';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { validateField, validationRules } from '../../../../../../utils/formFieldValidation';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const GitUrlPath = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useTypedFormContext();

  const { data: gitServers } = useGitServerListQuery();

  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  const gitServer = gitServers?.items.find(
    (gitServer) => gitServer.metadata.name === gitServerFieldValue
  );

  const gitServerProvider = gitServer?.spec.gitProvider;

  const title =
    gitServerProvider === GIT_PROVIDER.GITLAB
      ? 'Specify the codebase repository name in the following format: username/repository_name.'
      : 'Specify the codebase repository name.';

  const placeholder =
    gitServerProvider === GIT_PROVIDER.GERRIT
      ? 'repository_name'
      : 'username_or_organization/repository_name';

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.gitUrlPath.name, {
        required: 'Enter relative path to repository.',
        minLength: {
          value: 3,
          message: 'Repository name has to be at least 3 characters long.',
        },
        validate: (value) => validateField(value, validationRules.GIT_URL_PATH),
      })}
      label={'Repository name'}
      title={title}
      placeholder={placeholder}
      control={control}
      errors={errors}
    />
  );
};
