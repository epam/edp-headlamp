import React from 'react';
import { GIT_PROVIDER } from '../../../../../../constants/gitProviders';
import { useGitServerListQuery } from '../../../../../../k8s/groups/EDP/GitServer/hooks/useGitServerListQuery';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';

export const RepositoryUrl = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useTypedFormContext();

  const fieldRequirementLabel =
    'Specify the application URL in the following format: http(s)://git.example.com/example.';
  const { data: gitServers } = useGitServerListQuery({});

  const hasGerritGitServer = React.useMemo(() => {
    if (!gitServers) {
      return true;
    }

    return !!gitServers?.items.find((el) => el.spec.gitProvider === GIT_PROVIDER.GERRIT);
  }, [gitServers]);

  return (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.repositoryUrl.name, {
        required: fieldRequirementLabel,
        pattern: {
          value: /((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@\/~-]+)\w/,
          message: fieldRequirementLabel,
        },
        onBlur: ({ target: { value } }: FieldEvent) => {
          if (!value) {
            return;
          }

          const repoName = value.split('/').at(-1).replaceAll('/', '-');

          setValue(CODEBASE_FORM_NAMES.name.name, repoName);

          if (hasGerritGitServer) {
            return;
          }

          setValue(CODEBASE_FORM_NAMES.gitUrlPath.name, repoName);
        },
      })}
      label={'Repository URL'}
      title={fieldRequirementLabel}
      placeholder={'http(s)://git.sample.com/sample'}
      control={control}
      errors={errors}
    />
  );
};
