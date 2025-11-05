import { Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { FormAutocompleteSingle } from '../../../../../../providers/Form/components/FormAutocompleteSingle';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { validateField, validationRules } from '../../../../../../utils/formFieldValidation';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

const FROM_TYPE_OPTIONS = [
  {
    value: 'branch',
    label: 'Branch',
  },
  {
    value: 'commit',
    label: 'Commit Hash',
  },
];

export const FromCommit = () => {
  const {
    register,
    control,
    watch,
    resetField,
    unregister,
    formState: { errors },
  } = useTypedFormContext();

  const releaseValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);
  const fromType = watch(CODEBASE_BRANCH_FORM_NAMES.fromType.name) || 'branch';

  const {
    props: { codebase, defaultBranch },
    extra: { apiServiceBase, gitFusionApiService },
  } = useCurrentDialog();

  const codebaseGitUrlPath = codebase.spec.gitUrlPath;
  const codebaseGitServer = codebase.spec.gitServer;
  const codebaseRepoName = codebaseGitUrlPath.split('/').at(-1) || '';
  const codebaseOwner = codebaseGitUrlPath.split('/').filter(Boolean).slice(0, -1).join('/');

  const query = useQuery<{
    data: {
      name: string;
    }[];
  }>(
    ['branchList', codebaseGitServer, codebaseOwner, codebaseRepoName],
    () =>
      apiServiceBase.createFetcher(
        gitFusionApiService.getBranchListEndpoint(
          codebaseGitServer,
          codebaseOwner,
          codebaseRepoName
        )
      ),
    {
      enabled:
        !!apiServiceBase.apiBaseURL && !!codebaseGitServer && !!codebaseOwner && !!codebaseRepoName,
    }
  );

  const defaultBranchName = defaultBranch?.spec.branchName;

  const defaultBranchOption = React.useMemo(() => {
    return {
      label: defaultBranchName,
      value: defaultBranchName,
    };
  }, [defaultBranchName]);

  const branchesOptions = React.useMemo(() => {
    if (releaseValue && defaultBranch) {
      return [defaultBranchOption];
    }

    if (query.isLoading || query.isError || !query.data) {
      return [defaultBranchOption];
    }

    return (
      query.data.data?.map((branch: { name: string }) => ({
        label: branch.name,
        value: branch.name,
      })) || [defaultBranchOption]
    );
  }, [
    releaseValue,
    defaultBranch,
    query.isLoading,
    query.isError,
    query.data,
    defaultBranchOption,
  ]);

  const helperText = React.useMemo(() => {
    if (!apiServiceBase.apiBaseURL) {
      return 'Branches auto-discovery cannot be performed.';
    }

    if (query.isError) {
      return 'Branches auto-discovery could not be performed.';
    }

    return ' ';
  }, [apiServiceBase.apiBaseURL, query.isError]);

  const renderInputField = () => {
    if (releaseValue || fromType === 'branch') {
      return (
        <FormAutocompleteSingle
          key="branch"
          {...register(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name, {
            validate: (value) => {
              if (!value || value === '') {
                return true;
              }
              if (validationRules.BRANCH_NAME && typeof value === 'string') {
                const validationResult = validateField(value, validationRules.BRANCH_NAME);
                if (validationResult !== true) {
                  return validationResult;
                }
              }
              return true;
            },
          })}
          label="Branch name"
          placeholder="Select branch name"
          tooltipText="The new branch will be created starting from the selected branch. If this field is empty, the Default branch will be used."
          control={control}
          errors={errors}
          options={branchesOptions}
          disabled={query.isLoading}
          TextFieldProps={{
            helperText,
          }}
          AutocompleteProps={{
            loading: !!apiServiceBase.apiBaseURL && query.isLoading,
            freeSolo: true,
          }}
        />
      );
    } else {
      return (
        <FormTextField
          key="commitHash"
          {...register(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name, {
            pattern: {
              value: /^[a-fA-F0-9]{40}$/,
              message: 'Commit hash must be a full Git commit hash (40 hexadecimal characters)',
            },
            validate: (value) => {
              if (!value || value.trim() === '') {
                return true;
              }
              return true;
            },
          })}
          label="Commit hash"
          placeholder="Enter commit hash"
          title="The new branch will be created starting from the selected commit hash. If this field is empty, the Default branch will be used."
          control={control}
          errors={errors}
        />
      );
    }
  };

  const fromTypeOptions = React.useMemo(() => {
    return FROM_TYPE_OPTIONS.map((option) => ({
      ...option,
      disabled: releaseValue && option.value === 'commit',
    }));
  }, [releaseValue]);

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={6}>
        <FormSelect
          {...register(CODEBASE_BRANCH_FORM_NAMES.fromType.name, {
            onChange: ({ target: { value } }: FieldEvent) => {
              unregister(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name);

              if (value === 'commit') {
                resetField(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name, {
                  defaultValue: '',
                });
              } else {
                resetField(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name);
              }
            },
          })}
          control={control}
          errors={errors}
          label="From"
          title="Choose whether to create the branch from an existing branch or a specific commit hash"
          options={fromTypeOptions}
          defaultValue="branch"
        />
      </Grid>
      <Grid item xs={6}>
        {renderInputField()}
      </Grid>
    </Grid>
  );
};
