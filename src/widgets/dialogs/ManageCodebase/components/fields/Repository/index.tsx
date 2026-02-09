import React from 'react';
import { useQuery } from 'react-query';
import { FormAutocompleteSingle } from '../../../../../../providers/Form/components/FormAutocompleteSingle';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { validateField, validationRules } from '../../../../../../utils/formFieldValidation';
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

  const helperText = React.useMemo(() => {
    if (!apiServiceBase.apiBaseURL) {
      return 'Repositories auto-discovery cannot be performed.';
    }

    if (query.isError) {
      return 'Repositories auto-discovery could not be performed.';
    }

    return ' ';
  }, [apiServiceBase.apiBaseURL, query.isError]);

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
      disabled={!ownerFieldValue}
      options={repositoryOptions}
      AutocompleteProps={{
        freeSolo: true,
        loading: !!apiServiceBase.apiBaseURL && query.isLoading,
      }}
      TextFieldProps={{
        helperText,
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

          const validationResult = validateField(value, validationRules.REPOSITORY_NAME);
          if (validationResult !== true) {
            return validationResult;
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
