import { CircularProgress } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { FormAutocompleteSingle } from '../../../../../../providers/Form/components/FormAutocompleteSingle';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { isImportStrategy } from '../../../utils';

export const Repository = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useTypedFormContext();

  const strategyFieldValue = watch(CODEBASE_FORM_NAMES.strategy.name);
  const ownerFieldValue = watch(CODEBASE_FORM_NAMES.repositoryOwner.name);
  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  const { apiServiceBase, gitFusionApiService } = useCurrentDialog();

  const query = useQuery<{
    data: {
      default_branch: string;
      description: string;
      id: string;
      name: string;
      owner: string;
      url: string;
    }[];
  }>(
    ['gitServerRepoList', gitServerFieldValue, ownerFieldValue],
    () =>
      apiServiceBase.createFetcher(
        gitFusionApiService.getRepoListEndpoint(gitServerFieldValue, ownerFieldValue)
      ),
    {
      enabled: !!apiServiceBase.apiBaseURL && !!gitServerFieldValue && !!ownerFieldValue,
    }
  );

  const repositoryOptions = React.useMemo(() => {
    if (query.isLoading || query.isError || !query.data) {
      return [];
    }

    return (
      query.data.data?.map(({ name }) => ({
        label: name,
        value: name,
      })) || []
    );
  }, [query.data, query.isError, query.isLoading]);

  return isImportStrategy(strategyFieldValue) ? (
    <FormAutocompleteSingle
      placeholder={'repository_name'}
      {...register(CODEBASE_FORM_NAMES.repositoryName.name, {
        required: 'Select repository',
        onChange: ({ target: { value } }: FieldEvent) => {
          if (value) {
            setValue(CODEBASE_FORM_NAMES.name.name, value);
            setValue(CODEBASE_FORM_NAMES.gitUrlPath.name, `${ownerFieldValue}/${value}`);
          }
        },
      })}
      label={'Repository'}
      control={control}
      errors={errors}
      disabled={!ownerFieldValue || query.isLoading}
      options={repositoryOptions}
      TextFieldProps={{
        helperText: ' ',
        InputProps: {
          endAdornment: query.isLoading ? <CircularProgress size={15} /> : null,
        },
      }}
    />
  ) : (
    <FormTextField
      {...register(CODEBASE_FORM_NAMES.repositoryName.name, {
        required: 'Enter the repository name',
        onChange: ({ target: { value } }: FieldEvent) => {
          if (value) {
            setValue(CODEBASE_FORM_NAMES.name.name, value);
            setValue(CODEBASE_FORM_NAMES.gitUrlPath.name, `${ownerFieldValue}/${value}`);
          }
        },
        validate: (value) => {
          if (!value) {
            return 'Repository name is required';
          }
          if (value.length < 3) {
            return 'Repository name must be at least 3 characters long';
          }

          if (
            !query.isLoading &&
            !query.isError &&
            repositoryOptions.length > 0 &&
            repositoryOptions.some((option) => option.value === value)
          ) {
            return 'Repository with this name already exists';
          }

          return true;
        },
      })}
      label="Repository name"
      title="Specify the codebase repository name."
      placeholder="repository_name"
      control={control}
      errors={errors}
      disabled={!ownerFieldValue}
    />
  );
};
