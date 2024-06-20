import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { useGitServerListQuery } from '../../../../../k8s/EDPGitServer/hooks/useGitServerListQuery';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { validateField, validationRules } from '../../../../../utils/formFieldValidation';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { CreateCodebaseFormValues } from '../../Create/types';

export const GitUrlPath = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateCodebaseFormValues>();

  const { data: gitServers } = useGitServerListQuery({});

  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  const gitServer = gitServers?.items.find(
    (gitServer) => gitServer.metadata.name === gitServerFieldValue
  );

  const gitServerProvider = gitServer?.spec.gitProvider;

  const title =
    gitServerProvider === GIT_SERVERS.GITLAB
      ? 'Specify the codebase repository name in the following format: username/repository_name.'
      : 'Specify the codebase repository name.';

  const placeholder =
    gitServerProvider === GIT_SERVERS.GERRIT
      ? 'repository_name'
      : 'username_or_organization/repository_name';

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.gitUrlPath.name, {
        required: 'Enter relative path to repository.',
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
